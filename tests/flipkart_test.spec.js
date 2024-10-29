import { test, expect } from '@playwright/test';

test.only('flipkart', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
//   await page.getByLabel('Search', { exact: true }).click();
//   await page.getByLabel('Search', { exact: true }).click();
//   await page.waitForTimeout(2000);
//   await page.getByLabel('Search', { exact: true }).fill('youtube');
//   await page.waitForTimeout(2000);
});