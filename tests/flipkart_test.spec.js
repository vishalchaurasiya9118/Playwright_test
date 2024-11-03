import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test('flipkart', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Search', { exact: true }).fill('youtube');
  await page.waitForTimeout(2000);
});

test('orange', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const  click_button = page.locator("button[type='submit']");
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    console.log(await page.title());
    await page.locator("input[placeholder='Username']").fill('Admin');
    await page.locator("input[placeholder='Password']").fill('admin12345');
    await click_button.click();
    await expect(page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text")).toContainText('Invalid credentials');
    await page.waitForTimeout(2000);
  });

  test('Dropdown', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const  select_dropdown = page.locator("select#dropdown-class-example");
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    console.log(await page.title());
    await select_dropdown.selectOption("option1");
    await page.waitForTimeout(2000);
  });

  test('Checkbox', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const  checkbox = page.locator("input#checkBoxOption3");
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    console.log(await page.title());
    await checkbox.click();
    await page.waitForTimeout(2000);
    await expect(page.locator("input#checkBoxOption3")).toBeChecked();
  });

  test('RadioButtons', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const RadioButtons  = page.locator("input.radioButton").nth(0);
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    console.log(await page.title());
    await RadioButtons.click();
    await page.waitForTimeout(2000);
    await expect(page.locator("input.radioButton").nth(0)).toBeChecked();
  });

  test('ChildWindows', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const BlinkingLink  = page.locator("a.blinkingText");
    const  username = page.locator("#username");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const [newPage] = await Promise.all 
    (

        [
            context.waitForEvent('page'),
            BlinkingLink.click(),
        ])

    const text = await newPage.locator(".red").textContent()
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log("New text is :"+domain);
    await username.fill(domain);
    //await page.pause();
    await page.waitForTimeout(2000);
    const user_name = await username.textContent();
    console.log("thisUser:"+user_name)
    await page.waitForTimeout(2000);
  });

  test.only('E2E_Scenario', async ({ page }) => {

    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('mr.coolvishal89@gmail.com');
    await page.locator('#userPassword').fill('Zack@123');
    await page.locator("[value='Login']").click();
    await page.waitForTimeout(2000);
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0; i < count ; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {

            await products.nth(i).locator("text= Add To Cart").click();
            break;
        
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy(); 
    await page.waitForTimeout(2000);
    page.locator("text=Checkout").click();
    await page.waitForTimeout(1000);
    await page.locator(".text-validated").first().fill('4542 9931 9292 2293');
    await page.locator("[class*=ddl]").nth(0).click();
    await page.waitForTimeout(1000);
    //await page.locator("option:has-text('12')").nth(0).click();
    // await page.locator("text=12").nth(0).click();
    // await page.waitForTimeout(1000);
    // await page.locator("[class*=ddl]").nth(1).click();
    // await page.waitForTimeout(1000);
    // await page.locator("text=12").nth(1).click();
    await page.locator("[type=text]").nth(1).fill('900');
    await page.locator(".txt").nth(2).fill('Zack Snyder');
    await page.locator("[placeholder*=Country]").clear();
    await page.waitForTimeout(1000);
    await page.locator("[placeholder*=Country]").pressSequentially('India');
    await page.waitForTimeout(1000);
    await page.locator(".fa-search").nth(1).click();
    await page.locator(".btnn.action__submit").click();
    await page.waitForTimeout(4000);
    const expectedorderId = await page.locator("label.ng-star-inserted").textContent();
    console.log("ExpectedOrderIdIs:"+expectedorderId);
    const no= expectedorderId.trim();
    await page.locator("[routerlink*=myorders]").nth(0).click();
    await page.waitForTimeout(2000);
    const actualorderId = await page.locator("[scope=row]").textContent();
    console.log("ActualOrderIdIs:"+actualorderId);
    if(expectedorderId===actualorderId)
    {
        console.log("Order Verified");
    
    }

    else
    {
        console.log("Order Not Verified");
    }

    await page.locator(".btn.btn-danger").nth(0).click();
    await page.waitForTimeout(2000);
    const OrderDeletedMessage = await page.locator(".mt-4.ng-star-inserted").textContent();
    console.log(OrderDeletedMessage);
    await expect(page.locator(".mt-4.ng-star-inserted")).toContainText('You have No Orders to show at this time.');

  });

