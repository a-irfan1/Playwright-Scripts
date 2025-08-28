const {test, expect, request} = require('@playwright/test');
let webContext;
test.beforeAll(async ({browser}) => {
        webContext = await browser.newContext({storageState: 'state.json'});
});

test("@API API Tests", async () => {
    const productName = "ADIDAS ORIGINAL";
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator(".card-body").first().waitFor();
    
    const products = page.locator(".card-body");
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div img").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    
    await page.locator(".payment__type").first().waitFor();
    await expect (page.locator(".user__name [type='text']").first()).toHaveText("def@def.com");
    await page.locator(".input").nth(3).fill("123");
    await page.locator(".input").nth(4).fill("abc");


    await page.locator("[placeholder*=Country]").pressSequentially("Pa");

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const dropdownItems = await dropdown.locator(".ta-item").count();
    for (var i = 0; i < dropdownItems; i++){
        const text = await dropdown.locator(".ta-item").nth(i).textContent();
        if (text === " Pakistan"){
            await dropdown.locator(".ta-item").nth(i).click();
            break;
        }
    }

    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toContainText("Thankyou");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++){
        if (orderID.includes(await rows.nth(i).locator("th").textContent())){
            await rows.nth(i).locator(".btn-primary").click();
            break;
        }
    }

    expect(orderID.includes(await page.locator(".col-text").textContent())).toBeTruthy();
    
    await page.pause();
});