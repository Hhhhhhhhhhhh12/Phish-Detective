import { expect, test, type Locator, type Page } from '@playwright/test';
import { enterTraining, localRequestsOnly, navigate, captureReviewImage } from './helpers';

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    return Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - viewport;
  })).toBeLessThanOrEqual(1);
}

async function expectUrlDetail(inspector: Locator, label: string, value: string) {
  const row = inspector.getByText(label, { exact: true }).locator('..');
  await expect(row.locator('dd').first()).toHaveText(value);
}

const firstSagaChoice = /Innehalten, den Mauszeiger über den Link bewegen/;
const secondSagaChoice = /Ein langes Passwort \(Passphrase\) aus 4 zufälligen Wörtern/;
const continueLabel = 'Weiter zur nächsten Szene';

test.beforeEach(async ({ page }) => {
  await localRequestsOnly(page);
  // Install before navigation so application timers and their cancellation use
  // the same clock. runFor advances timers without fixed wall-clock sleeps.
  await page.clock.install({ time: new Date('2026-11-24T12:00:00Z') });
});

test('password briefing and illustration clearly remain a training exercise', async ({ page }) => {
  await enterTraining(page, true);
  await navigate(page, 'Passwort-Lab');
  const lab = page.locator('#password-lab-root');
  await expect(lab.locator('#password-lab-privacy')).toContainText('keine echten Kennwörter');
  await lab.getByRole('button', { name: /Erläuterung ansehen/ }).click();
  const briefing = page.locator('#password-lab-introduction');
  await expect(briefing).toBeVisible();
  await expect(briefing).toContainText('keine belastbare Knackzeit');
  await briefing.getByRole('button', { name: 'Zurück zu den Trainingsbeispielen', exact: true }).click();

  await lab.getByRole('button', { name: 'Trainingsbeispiel wechseln', exact: true }).click();
  await expect(lab.locator('#password-input-field')).not.toHaveValue('');
  await expect(lab.locator('#password-example-note')).toContainText('keine Kennwörter für echte Konten');
  await lab.getByRole('button', { name: 'Illustration starten', exact: true }).click();
  await expect(lab.getByRole('status')).toHaveText('Die Lernillustration läuft.');
  await page.clock.runFor(4_000);
  await expect(lab.getByRole('progressbar', { name: 'Animationsfortschritt' })).toHaveAttribute('aria-valuenow', '100');
  await expect(lab.getByRole('status')).toContainText('Es wurde kein Kennwort geknackt oder auf Sicherheit geprüft.');
  await expect(lab).not.toContainText(/unbezwingbar|Billionen Fehlversuchen|Passwort kompromittiert/i);
  await captureReviewImage(page, 'password-illustration');
});

test('password input changes, clearing and leaving the module cancel stale illustration results', async ({ page }) => {
  await enterTraining(page, true);
  await navigate(page, 'Passwort-Lab');
  const lab = page.locator('#password-lab-root');
  const input = lab.locator('#password-input-field');
  const start = lab.getByRole('button', { name: 'Illustration starten', exact: true });
  const progress = lab.getByRole('progressbar', { name: 'Animationsfortschritt' });

  await input.fill('nebel-kiesel-waldfisch');
  await start.click();
  await page.clock.runFor(700);
  await expect(progress).not.toHaveAttribute('aria-valuenow', '0');
  await input.fill('anderes-erfundenes-beispiel');
  await expect(progress).toHaveAttribute('aria-valuenow', '0');
  await page.clock.runFor(5_000);
  await expect(progress).toHaveAttribute('aria-valuenow', '0');
  await expect(lab.getByRole('status')).toHaveText('Die Lernillustration ist bereit.');

  await start.click();
  await page.clock.runFor(700);
  await lab.getByRole('button', { name: 'Eingabe leeren', exact: true }).click();
  await page.clock.runFor(5_000);
  await expect(input).toHaveValue('');
  await expect(progress).toHaveAttribute('aria-valuenow', '0');
  await expect(start).toBeDisabled();
  await expect(lab.getByRole('status')).toHaveText('Die Lernillustration ist bereit.');

  await input.fill('ein-weiteres-lernbeispiel');
  await start.click();
  await page.clock.runFor(700);
  await navigate(page, 'URL Scan');
  await expect(lab).toBeHidden();
  await page.clock.runFor(5_000);
  await navigate(page, 'Passwort-Lab');
  await expect(input).toHaveValue('');
  await expect(progress).toHaveAttribute('aria-valuenow', '0');
  await expect(start).toBeDisabled();
});

test('URL inspection clears stale results and announces invalid input submitted with Enter', async ({ page }) => {
  await enterTraining(page, true);
  await navigate(page, 'URL Scan');
  const inspector = page.locator('#inspector-tool-root');
  const input = inspector.locator('#inspect-input');
  const initialLocation = page.url();
  await input.fill('https://training.example.org/lesson');
  await input.press('Enter');
  await expect(inspector.locator('#inspection-result-title')).toBeVisible();

  await input.fill('https://');
  await expect(inspector.locator('#inspection-result-title')).toBeHidden();
  await input.press('Enter');
  await expect(inspector.getByRole('alert')).toBeVisible();
  await expect(inspector.getByRole('alert')).toContainText('Bitte schreibe das Protokoll vollständig');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(inspector.locator('#inspection-result-title')).toBeHidden();
  await expect(page).toHaveURL(initialLocation);

  await input.fill('https://training.example.org/corrected');
  await expect(inspector.getByRole('alert')).toBeHidden();
  await input.press('Enter');
  await expectUrlDetail(inspector, 'Zielhost laut URL', 'training.example.org');
  await expect(inspector.getByRole('alert')).toBeHidden();
});

const urlCases = [
  {
    name: 'userinfo before @ is hidden and does not become the target host',
    input: 'https://bank.example:training-only@training.example.org/login',
    host: 'training.example.org', domain: 'example.org', suffix: 'org',
    note: 'Vor dem @ stehen URL-Anmeldedaten, nicht der Zielhost.',
  },
  {
    name: 'private github.io suffix and a long path remain readable within the viewport',
    input: `https://login.detective-training.github.io/${'long-training-segment-'.repeat(40)}?lesson=${'a'.repeat(120)}`,
    host: 'login.detective-training.github.io', domain: 'detective-training.github.io', suffix: 'github.io',
    note: 'privaten Hosting-Teil der Public Suffix List',
  },
  {
    name: 'multi-part co.uk suffix preserves the registrable boundary',
    input: 'https://login.training.example.co.uk/lesson',
    host: 'login.training.example.co.uk', domain: 'example.co.uk', suffix: 'co.uk',
    note: 'Bekannte Wörter in ihr belegen keine Verbindung zu einer Marke.',
  },
  {
    name: 'international host is shown as Punycode without declaring fraud',
    input: 'https://bücher.example.org/lesen',
    host: 'xn--bcher-kva.example.org', domain: 'example.org', suffix: 'org',
    note: 'Solche Namen sind auch legitim',
  },
  {
    name: 'IPv6 remains an IP address instead of a manufactured domain',
    input: 'https://[2001:db8::1]:8443/lernen',
    host: '[2001:db8::1]', domain: 'Nicht ermittelt', suffix: 'Nicht ermittelt',
    note: 'IPv6-Adresse, keine Domain-Aufteilung.',
  },
];

for (const example of urlCases) {
  test(`URL inspection: ${example.name}`, async ({ page }) => {
    await enterTraining(page, true);
    await navigate(page, 'URL Scan');
    const inspector = page.locator('#inspector-tool-root');
    const initialLocation = page.url();
    const targetRequests: string[] = [];
    page.on('request', request => {
      if (new URL(request.url()).hostname === example.host) targetRequests.push(request.url());
    });

    await inspector.locator('#inspect-input').fill(example.input);
    await inspector.locator('#inspect-input').press('Enter');
    await expectUrlDetail(inspector, 'Zielhost laut URL', example.host);
    await expectUrlDetail(inspector, 'Registrierbarer Bereich laut Liste', example.domain);
    await expectUrlDetail(inspector, 'Öffentliche Endung', example.suffix);
    await expect(inspector).toContainText(example.note);
    await expect(inspector.getByRole('status')).toHaveText('Adresse zerlegt. Die Website wurde nicht kontaktiert.');
    await expect(page).toHaveURL(initialLocation);
    expect(targetRequests).toEqual([]);
    expect(page.context().pages()).toHaveLength(1);

    if (example.input.includes('@')) {
      const renderedUrl = inspector.locator('[aria-label="Normalisierte URL-Bestandteile"]');
      await expect(renderedUrl).toContainText('[Anmeldedaten ausgeblendet]@');
      await expect(renderedUrl).not.toContainText('training-only');
      await expect(renderedUrl).not.toContainText('bank.example');
    }
    if (example.suffix === 'github.io') {
      await expectNoHorizontalOverflow(page);
      await captureReviewImage(page, 'url-inspector-long-path');
    }
  });
}

test('comic feedback waits for Weiter and resetting a pending scene also resets its points', async ({ page }) => {
  await enterTraining(page, true);
  await navigate(page, 'Noir-Comics');
  const comic = page.locator('#noir-comics-root');
  await comic.getByRole('button', { name: firstSagaChoice }).click();
  await expect(comic.getByRole('status')).toContainText('Clever!');
  await page.clock.runFor(5_000);
  await expect(comic.getByRole('status')).toContainText('Clever!');
  await expect(comic.getByText('Panel-ID: 1 // NODE_SAGA', { exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await captureReviewImage(page, 'comic-feedback');

  await comic.getByRole('button', { name: continueLabel, exact: true }).click();
  await expect(comic.getByText('Panel-ID: 3 // NODE_SAGA', { exact: true })).toBeVisible();
  await comic.getByRole('button', { name: /Saga erfolgreich beenden und Belohnung einsammeln/ }).click();
  await expect(comic.getByRole('status')).toBeVisible();
  await comic.getByRole('button', { name: 'RESTART_AKT', exact: true }).click();
  await page.clock.runFor(5_000);
  await expect(comic.getByText('Panel-ID: 1 // NODE_SAGA', { exact: true })).toBeVisible();
  await expect(comic.getByRole('status')).toBeHidden();

  await comic.getByRole('button', { name: firstSagaChoice }).click();
  await comic.getByRole('button', { name: continueLabel, exact: true }).click();
  await comic.getByRole('button', { name: /Saga erfolgreich beenden und Belohnung einsammeln/ }).click();
  await comic.getByRole('button', { name: continueLabel, exact: true }).click();
  await expect(comic).toContainText('Saga abgeschlossen! Comicpunkte in diesem Durchlauf: 150.');
});

test('changing sagas during feedback keeps the new opening scene and does not carry points over', async ({ page }) => {
  await enterTraining(page, true);
  await navigate(page, 'Noir-Comics');
  const comic = page.locator('#noir-comics-root');
  await comic.getByRole('button', { name: firstSagaChoice }).click();
  await expect(comic.getByRole('status')).toContainText('Clever!');
  const secondSaga = comic.getByRole('button', { name: /Das schwache Passwort-Flüstern/ });
  await secondSaga.click();
  await expect(secondSaga).toHaveAttribute('aria-pressed', 'true');
  await page.clock.runFor(5_000);
  await expect(comic.getByText('Panel-ID: 1 // NODE_SAGA', { exact: true })).toBeVisible();
  await expect(comic).toContainText('Phish richtet den Router ein.');
  await expect(comic.getByRole('status')).toBeHidden();

  await comic.getByRole('button', { name: secondSagaChoice }).click();
  await comic.getByRole('button', { name: continueLabel, exact: true }).click();
  await comic.getByRole('button', { name: /Siegessignale anwerfen und Saga beenden/ }).click();
  await comic.getByRole('button', { name: continueLabel, exact: true }).click();
  await expect(comic).toContainText('Saga abgeschlossen! Comicpunkte in diesem Durchlauf: 140.');
});

test('example reports stay labelled as fixed content and show no invented probability', async ({ page }) => {
  await enterTraining(page, true);
  await navigate(page, 'Beispielberichte');
  const reports = page.getByRole('region', { name: 'Beispielberichte', exact: true });
  await expect(reports).toContainText('Die Berichte sind feste Beispiele');
  await expect(reports.getByRole('textbox')).toHaveCount(0);
  const analysisRequests: string[] = [];
  page.on('request', request => {
    if (['fetch', 'xhr'].includes(request.resourceType())) analysisRequests.push(request.url());
  });

  for (const name of ['PayPal-Beispiel', 'Phishing-Beispiel']) {
    await reports.getByRole('button', { name, exact: true }).click();
    const result = reports.locator('#scanner-scan-results');
    await expect(result).toBeVisible();
    await expect(result).toContainText('Festes Trainingsbeispiel · keine Live-Analyse');
    await expect(result).toContainText('Es wird keine Betrugswahrscheinlichkeit berechnet.');
    await expect(result).not.toContainText(/\d+\s*%/);
  }
  await expect(reports.locator('#scanner-scan-results')).toContainText('Dieser vorbereitete Fall zeigt');
  expect(analysisRequests).toEqual([]);
});
