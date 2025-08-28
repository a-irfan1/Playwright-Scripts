const { test, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const { json } = require('stream/consumers');
const loginPayload = { userEmail: "def@def.com", userPassword: "DEFdef123!" };
const orderPayload = { orders: [{ "country": "Algeria", "productOrderedId": "6581ca979fd99c85e8ee7faf" }] };
const fakePayload = { data: [], message: "No orders" };
let response;

test.beforeAll(async () => {
    const context = await request.newContext();
    const apiUtils = new APIUtils(context, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test('Response interception', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayload);
        route.fulfill(
            {
                response,
                body,
            }
        );
    });
    await page.locator("[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.pause();
});