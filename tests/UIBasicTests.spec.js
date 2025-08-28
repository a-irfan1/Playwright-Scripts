const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test.only('Playwright test 1', async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.{jpeg,jpg}', route => route.abort());

    const username = page.locator('#username');
    const signInBtn = page.locator('[name=signin]');
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.status()));

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await username.fill('abcd');
    await page.locator('[type=password]').fill('learning');
    await signInBtn.click();
    await expect(page.locator('[style*=block]')).toContainText('Incorrect');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signInBtn.click();
    await page.locator('.card-title').first().waitFor();
    console.log(await page.locator('.card-title').allTextContents());
    await page.pause();


});

test ('Playwright test 2', async ({page}) => {
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const docLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption("teach");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    await expect(docLink).toHaveAttribute("class","blinkingText");
});

test('Context new page test',async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const docLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        docLink.click(),
    ]);

    const text = (await newPage.locator('.red').textContent());
    const text2 = text.split("@");
    const domain = text2[1].split(" ")[0];

    await page.locator('#username').fill(domain);
});
