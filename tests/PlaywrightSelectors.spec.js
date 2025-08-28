const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test.only('Playwright selectors', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check ", {exact:false}).check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByLabel("Student").click();
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: "Submit"}).click();

    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia"}).getByRole("button").click();
    
});