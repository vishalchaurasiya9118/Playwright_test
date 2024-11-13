

import { test, expect, request } from '@playwright/test';
const loginPayload = {userEmail: "mr.coolvishal89@gmail.com", userPassword: "Zack@123"}

let token;

test.beforeAll( async()=>
{

   const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayload
    }
)
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token =loginResponseJson.token;
    console.log("Token Is: "+token);
  
});

test('API_Testing', async ({ page }) => {

    page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);
    }, token
    );

    const productName = 'ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator(".card-body");
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



