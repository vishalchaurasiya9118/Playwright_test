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

test('PracticeForm', async ({ page }) => {

  const date = '4';
  const month = '8';
  const year = '2025';

  await page.goto('https://demoqa.com/automation-practice-form');
  await page.getByPlaceholder('First Name').fill('Zack');
  await page.getByPlaceholder('Last Name').fill('Snyder');
  await page.getByPlaceholder('name@example.com').fill('zacksnyder789@gmail.com');
  await page.locator("[for$='gender-radio-1']").click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Mobile Number').fill('7071071190');
  await page.waitForTimeout(1000);
  await page.locator("#dateOfBirthInput").click();
  await page.locator('.react-datepicker__month-select').selectOption(""+month-1+"");
  await page.locator('.react-datepicker__year-select').selectOption(""+year+"");
  await page.locator("//div[text()='"+date+"']").nth(0).click();
  await page.waitForTimeout(1000);
  await page.locator('#subjectsInput').fill('English');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  await page.locator("[for$='hobbies-checkbox-2']").click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Current Address').fill('3/4 Anand vihar , New delhi');
  await page.waitForTimeout(1000);
  await page.getByText('Select State').click();
  await page.waitForTimeout(1000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.getByText('Select City').click();
  await page.waitForTimeout(1000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.locator('button#submit').click();
  await page.waitForTimeout(2000);


});

test('Alerts', async ({ page }) => {

  await page.goto('https://demoqa.com/alerts');
  await page.locator("#alertButton").click();
  await page.waitForTimeout(1000);
  page.on('dialog',dailog => dailog.accept());
  await page.waitForTimeout(1000);
  await page.locator("#timerAlertButton").click();
  await page.waitForTimeout(5000);
  page.on('dialog',dailog => dailog.accept());
  await page.waitForTimeout(1000);

});

test('Frames', async ({ page }) => {

  await page.goto('https://demoqa.com/frames');
  const FramePage = page.frameLocator("#frame1");
  const text = await FramePage.locator("#sampleHeading").textContent();
  console.log(text);
  
});

