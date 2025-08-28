import {test, expect} from '@playwright/test';
import {POManager} from '../PageObjectsTS/POManager';
import {customtest} from "../utils/CustomTest";
import { text } from 'stream/consumers';
const dataSets = JSON.parse(JSON.stringify(require("../utils/ClientAppPOData.json")));

// test.describe.configure({mode: 'serial'});

customtest('@PO Client App Tests', async ({page, testData}) => {
    const poManager = new POManager(page);
    const login = poManager.getLoginPage();
    const dashboard = poManager.getDashboardPage();
    const cart = poManager.getCartPage();
    const checkout = poManager.getCheckoutPage();
    const order = poManager.getOrdersPages();
    
    await login.goTo();
    await login.login(testData.email, testData.password);
    await dashboard.searchAndAddToCart(testData.productName);
    await dashboard.navigateToCart();
    await cart.isProductVisible(testData.productName);
    await cart.goToCheckout();
    await checkout.isEmailVisible(testData.email);
    await checkout.fillInformation("123", "abc");
    await checkout.selectCountry("Pa", " Pakistan");
    await checkout.submitOrder();
    await order.checkThankyou();
    await order.getAndCheckOrderID();
 });

for (const data of dataSets)
{
    test(` @PO Client App Tests with Page Object Manager for ${data.productName}`, async ({page}) => {
        const poManager = new POManager(page);
        const login = poManager.getLoginPage();
        const dashboard = poManager.getDashboardPage();
        const cart = poManager.getCartPage();
        const checkout = poManager.getCheckoutPage();
        const order = poManager.getOrdersPages();

        await login.goTo();
        await login.login(data.email, data.password);
        await dashboard.searchAndAddToCart(data.productName);
        await dashboard.navigateToCart();
        await cart.isProductVisible(data.productName);
        await cart.goToCheckout();
        await checkout.isEmailVisible(data.email);
        await checkout.fillInformation("123", "abc");
        await checkout.selectCountry("Pa", " Pakistan");
        await checkout.submitOrder();
        await order.checkThankyou();
        await order.getAndCheckOrderID();
    });
}
// test('Selecting single element from multiple of a kind/ test using playwright locators', async ({page}) => {
//     await page.goto('https://rahulshettyacademy.com/client/');
//     await page.getByPlaceholder('email@example.com').fill('def@def.com');
//     await page.locator('#userPassword').fill('DEFdef123!');
//     await page.getByRole('button', {name: "Login"}).click();

//     await page.waitForLoadState('networkidle');
//     await page.locator(".card-body").first().waitFor();
    
//     await page.locator(".card-body").filter({hasText: "ADIDAS ORIGINAL"}).getByRole("button", {name: "Add To Cart"}).click();

//     await page.locator("li").getByRole("button", {name: "Cart"}).click();
//     await page.locator("div img").first().waitFor();
//     await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
//     await page.getByRole("button" , {name: "Checkout"}).click();
    
//     await page.locator(".payment__type").first().waitFor();
   
//     await page.getByPlaceholder("Select Country").pressSequentially("Pa");
//     await page.getByRole("button", {name: "Pakistan"}).click();

//     await page.getByText("PLACE ORDER").click();
//     await expect(page.getByText("Thankyou")).toBeVisible();
//     const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

//     await page.getByRole("button").getByText(" ORDERS").click();
//     await page.locator("tbody").waitFor();
//     console.log(orderID);

//     for (let i = 0; i < await rows.count(); i++){
//         if (orderID.includes(await rows.nth(i).locator("th").textContent())){
//             await rows.nth(i).locator(".btn-primary").click();
//             break;
//         }    
//     }

//     expect(orderID.includes(await page.locator(".col-text").textContent())).toBeTruthy();
    
//     await page.pause();
// });
