const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils')
const loginPayload = {userEmail:"def@def.com",userPassword:"DEFdef123!"};
const orderPayload = {orders:[{"country":"Algeria","productOrderedId":"6581ca979fd99c85e8ee7faf"}]};
let response;

test.beforeAll(async () => {
    const context = await request.newContext();
    const apiUtils = new APIUtils(context, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test('Selecting single element from multiple of a kind/ test', async ({page}) => {

    page.addInitScript(value => {window.localStorage.setItem('token', value);}, response.token);
    await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++){
        if (response.orderID.includes(await rows.nth(i).locator("th").textContent())){
            await rows.nth(i).locator(".btn-primary").click();
            break;
        }
    }

    expect(response.orderID.includes(await page.locator(".col-text").textContent())).toBeTruthy();
    
    await page.pause();
});