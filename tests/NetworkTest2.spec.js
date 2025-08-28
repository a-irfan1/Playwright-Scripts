const { test, request } = require('@playwright/test');


test('Selecting single element from multiple of a kind/ test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('def@def.com');
    await page.locator('#userPassword').fill('DEFdef123!');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("[routerlink*='myorders']").first().click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
        route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'"}));
    await page.locator("button:has-text('View')").first().click();
   
    await page.pause();
});