import { expect, test, type Page } from '@playwright/test';

export async function captureReviewImage(page: Page, name: string) {
  await test.info().attach(name, {
    body: await page.screenshot({ fullPage: true, animations: 'disabled' }),
    contentType: 'image/png',
  });
}

export async function enterTraining(page: Page, demo = false) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/Phish-Detective/');
  await page.getByRole('button', { name: 'START', exact: true }).click();
  await expect(page.locator('#dashboard-root')).toBeVisible();
  if (demo) {
    const toggle = page.getByRole('button', { name: 'Demo-Modus: aus', exact: true });
    if (await toggle.isVisible()) await toggle.click();
  }
}

export async function navigate(page: Page, label: string) {
  await page.locator('#applet-navigation-tabs').getByRole('button', { name: label, exact: true }).click();
}

/** No test should contact a training link or third-party font/image service. */
export async function localRequestsOnly(page: Page) {
  await page.context().route('**/*', route => {
    const url = new URL(route.request().url());
    return url.hostname === '127.0.0.1' ? route.continue() : route.abort();
  });
}

export async function readStored<T>(page: Page, key: string): Promise<T | null> {
  return page.evaluate(storageKey => {
    const raw = localStorage.getItem(storageKey);
    return raw === null ? null : JSON.parse(raw);
  }, key);
}

export const initialPet = {
  name: 'Byte', level: 1, xp: 95, totalXp: 95, energy: 80,
  happiness: 75, passwordDefense: 30, lastAction: '',
};
