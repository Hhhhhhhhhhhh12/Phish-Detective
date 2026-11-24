import { test, expect, type Page } from '@playwright/test';
import { getLocalizedGamePacketsPool } from '../../src/utils/i18n';
import { enterTraining, navigate, localRequestsOnly, readStored, initialPet, captureReviewImage } from './helpers';

type Pet = typeof initialPet;
type Profile = { xp: number; completedCasesCount: number; activeCaseId: string; lastGuess?: boolean; solvedCaseIds: string[] };

test.beforeEach(async ({ page }) => localRequestsOnly(page));

async function seedPet(page: Page, pet = initialPet) {
  await page.addInitScript(value => {
    if (localStorage.getItem('phish_detective_pet') === null) {
      localStorage.setItem('phish_detective_pet', JSON.stringify(value));
    }
  }, pet);
}

test('keyboard START with reduced motion enters the dashboard and moves focus', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/Phish-Detective/');
  await expect(page.getByText('Reduzierte Bewegung: direkter Einstieg.', { exact: true })).toBeVisible();
  const start = page.getByRole('button', { name: 'START', exact: true });
  await start.focus();
  await start.press('Enter');
  await expect(page.locator('#dashboard-root')).toBeVisible();
  await expect(page.locator('#app-title')).toBeFocused();
  await expect(page.locator('video')).toHaveCount(0);
  await captureReviewImage(page, 'dashboard');
});

test('Escape skips a pending intro instead of trapping the learner', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let releaseVideo: (() => Promise<void>) | undefined;
  await page.route('**/pov.mp4', route => new Promise<void>(resolve => {
    releaseVideo = async () => { await route.abort(); resolve(); };
  }));
  await page.goto('/Phish-Detective/');
  await page.getByRole('button', { name: 'START', exact: true }).click();
  const skip = page.getByRole('button', { name: 'Intro überspringen', exact: true });
  await expect(skip).toBeFocused();
  await skip.press('Escape');
  await expect(page.locator('#dashboard-root')).toBeVisible();
  await releaseVideo?.();
});

test('missing intro media falls back to the training application', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route('**/media/detective/*.mp4', route => route.abort());
  await page.goto('/Phish-Detective/');
  await page.getByRole('button', { name: 'START', exact: true }).click();
  await expect(page.locator('#dashboard-root')).toBeVisible();
});

test('evolution preserves earned unlocks across navigation and reload', async ({ page }) => {
  await seedPet(page);
  await enterTraining(page);
  await navigate(page, 'Phish-O-Mat');
  await page.getByRole('button', { name: /ABSENDER FORENSIK LEHREN/ }).click();
  await expect.poll(async () => readStored<Pet>(page, 'phish_detective_pet')).toMatchObject({ level: 2, xp: 15, totalXp: 115 });
  await navigate(page, 'Simulator');
  await expect(page.locator('#simulator-container-elem')).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'START', exact: true }).click();
  await navigate(page, 'Simulator');
  await expect(page.locator('#simulator-container-elem')).toBeVisible();
  await expect.poll(async () => readStored<Pet>(page, 'phish_detective_pet')).toMatchObject({ totalXp: 115 });
});

test('answers restore after reload and reset preserves Byte and unrelated data', async ({ page }) => {
  await seedPet(page);
  await page.addInitScript(() => localStorage.setItem('unrelated-settings', 'keep'));
  await enterTraining(page, true);
  await navigate(page, 'Simulator');
  await expect(page.getByText('ERSTE AKTE ÖFFNEN!', { exact: true })).toBeVisible();
  const preview = page.getByRole('button', { name: /Ziel anzeigen, öffnet keine Website/ });
  await preview.focus();
  await expect(page.getByRole('status').filter({ hasText: 'Link-Ziel:' })).toBeVisible();
  const beforeUrl = page.url();
  await preview.click();
  await expect(page).toHaveURL(beforeUrl);
  await page.getByRole('button', { name: '🚨 PHISHING', exact: true }).click();
  await expect(page.getByText('ERFOLGREICH IDENTIFIZIERT!', { exact: true })).toBeVisible();
  await expect(page.getByText('Noch keine Antworten', { exact: true }).first()).toBeVisible();
  const answered = await readStored<Profile>(page, 'phish_detective_profile_v2');
  expect(answered).toMatchObject({ xp: 50, completedCasesCount: 1, activeCaseId: 'case-paypal', lastGuess: true });
  await page.reload();
  await page.getByRole('button', { name: 'START', exact: true }).click();
  await navigate(page, 'Simulator');
  await expect(page.getByText('ERFOLGREICH IDENTIFIZIERT!', { exact: true })).toBeVisible();
  expect(await readStored(page, 'phish_detective_profile_v2')).toEqual(answered);
  await page.getByRole('button', { name: 'NÄCHSTE AKTE', exact: true }).click();
  await page.getByRole('button', { name: '✅ LEGITIM / KLAR', exact: true }).click();
  await expect(page.getByText('SCHAU DIR DIE ERKLÄRUNG AN', { exact: true })).toBeVisible();
  expect(await readStored<Profile>(page, 'phish_detective_profile_v2')).toMatchObject({ xp: 60, completedCasesCount: 2, activeCaseId: 'case-dhl', lastGuess: false });

  const reset = page.getByRole('button', { name: /SIMULATOR-FORTSCHRITT ZURÜCKSETZEN/ });
  page.once('dialog', dialog => dialog.dismiss());
  await reset.click();
  expect(await readStored<Profile>(page, 'phish_detective_profile_v2')).toMatchObject({ xp: 60 });
  page.once('dialog', dialog => dialog.accept());
  await reset.click();
  expect(await readStored<Profile>(page, 'phish_detective_profile_v2')).toMatchObject({ xp: 0, completedCasesCount: 0, solvedCaseIds: [] });
  expect(await readStored<Pet>(page, 'phish_detective_pet')).toMatchObject({ totalXp: 95 });
  expect(await page.evaluate(() => localStorage.getItem('unrelated-settings'))).toBe('keep');
});

for (const corrupted of ['{broken', 'null', '[]']) {
  test(`invalid stored progress (${corrupted}) does not crash or overwrite itself on read`, async ({ page }) => {
    await page.addInitScript(value => localStorage.setItem('phish_detective_pet', value), corrupted);
    await enterTraining(page);
    await expect(page.getByText(/Ein gespeicherter Stand war ungültig/)).toBeVisible();
    await navigate(page, 'Phish-O-Mat');
    await expect(page.locator('#pet-display-name')).toHaveText('Byte');
    expect(await page.evaluate(() => localStorage.getItem('phish_detective_pet'))).toBe(corrupted);
  });
}

for (const blockedAccess of ['getter', 'write'] as const) {
  test(`blocked storage ${blockedAccess} keeps session progress and explains its limits`, async ({ page }) => {
    await page.addInitScript(mode => {
      if (mode === 'getter') {
        Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new DOMException('Blocked in test', 'SecurityError'); } });
      } else {
        Storage.prototype.setItem = () => { throw new DOMException('Full in test', 'QuotaExceededError'); };
      }
    }, blockedAccess);
    await enterTraining(page);
    await navigate(page, 'Phish-O-Mat');
    await page.getByRole('button', { name: /ABSENDER FORENSIK LEHREN/ }).click();
    await expect(page.getByText(/Änderungen bleiben nur in diesem Tab/)).toBeVisible();
    await navigate(page, 'HQ Pfad');
    await expect(page.locator('#dashboard-root').getByText('35 XP', { exact: true })).toBeVisible();
    await navigate(page, 'Phish-O-Mat');
    await page.getByRole('button', { name: /ABSENDER FORENSIK LEHREN/ }).click();
    await navigate(page, 'HQ Pfad');
    await expect(page.locator('#dashboard-root').getByText('55 XP', { exact: true })).toBeVisible();
  });
}

test('sequential actions in two open tabs preserve progress and synchronise demo mode', async ({ page, context }) => {
  await seedPet(page, { ...initialPet, xp: 15, totalXp: 15 });
  await enterTraining(page);
  await navigate(page, 'Phish-O-Mat');
  const other = await context.newPage();
  await enterTraining(other);
  await navigate(other, 'Phish-O-Mat');
  await page.getByRole('button', { name: /ABSENDER FORENSIK LEHREN/ }).click();
  await other.getByRole('button', { name: /ABSENDER FORENSIK LEHREN/ }).click();
  expect(await readStored<Pet>(other, 'phish_detective_pet')).toMatchObject({ totalXp: 55 });
  await page.getByRole('button', { name: 'Demo-Modus: aus', exact: true }).click();
  await expect(other.getByRole('button', { name: 'Demo-Modus: an', exact: true })).toBeVisible();
  await navigate(page, 'Simulator');
  await navigate(other, 'Simulator');
  await other.getByRole('button', { name: /DHL.*-/ }).click();
  await page.getByRole('button', { name: '🚨 PHISHING', exact: true }).click();
  await other.getByRole('button', { name: '🚨 PHISHING', exact: true }).click();
  expect(await readStored<Profile>(page, 'phish_detective_profile_v2')).toMatchObject({ xp: 100, completedCasesCount: 2, solvedCaseIds: ['case-paypal', 'case-dhl'] });
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: /SIMULATOR-FORTSCHRITT ZURÜCKSETZEN/ }).click();
  await expect(other.getByText(/Simulator-Fortschritt wurde in einem anderen Tab zurückgesetzt/)).toBeVisible();
  expect(await readStored<Profile>(other, 'phish_detective_profile_v2')).toMatchObject({ xp: 0, completedCasesCount: 0 });
  await page.getByRole('button', { name: 'Demo-Modus: an', exact: true }).click();
  await expect(other.getByRole('button', { name: 'Demo-Modus: aus', exact: true })).toBeVisible();
  await expect(other.locator('#dashboard-root')).toBeVisible();
});

test('starting another card round preserves learned cards and leaving stops delayed rewards', async ({ page }) => {
  const mastered = Object.fromEntries(getLocalizedGamePacketsPool('de').map(packet => [packet.text, 2]));
  await page.addInitScript(map => localStorage.setItem('phish_leitner_box', JSON.stringify(map)), mastered);
  await page.clock.install({ time: new Date('2026-11-24T12:00:00Z') });
  await enterTraining(page);
  await navigate(page, 'Phish-O-Mat');
  await page.clock.pauseAt(new Date('2026-11-24T13:00:00Z'));
  await page.getByRole('button', { name: /REFLEX-REFLEKTOR \(SPIELEN\)/ }).click();
  expect(await readStored(page, 'phish_leitner_box')).toEqual(mastered);
  const petAtStart = await readStored<Pet>(page, 'phish_detective_pet');
  const block = page.getByRole('button', { name: /BLOCK \/ PHISH/ });
  for (let round = 1; round < 5; round++) {
    await block.click();
    await page.clock.runFor(1_400);
    await expect(block).toBeEnabled();
  }
  // Only the fifth answer schedules a pet reward. Leaving before its delayed
  // completion must cancel that write, even if earlier rounds were wrong.
  await expect(page.locator('#retro-stage-display')).toContainText('GAME-MATRIX // SCREEN 5/5');
  await block.click();
  await navigate(page, 'HQ Pfad');
  await page.clock.runFor(8_000);
  expect(await readStored<Pet>(page, 'phish_detective_pet')).toEqual(petAtStart);
});
