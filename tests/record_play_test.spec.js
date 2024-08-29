import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Search', { exact: true }).fill('youtube');
  await page.waitForTimeout(2000);
});

test('Docyt_test', async ({ page }) => {
  await page.goto('https://app.pre.docyt.com/');
  await page.locator("//a[@class='header-logo-sign-up']").isVisible();
  await page.locator("//h1[text()='Sign in']").isVisible();
  await page.waitForTimeout(5000);
});