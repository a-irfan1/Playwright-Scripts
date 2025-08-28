const {test, expect} = require('@playwright/test');

test.only("More playwright assertions", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    page.on("dialog", dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const frame = page.frameLocator("#courses-iframe");
    await frame.locator("li a[href*='lifetime']:visible").click();
    const text = await frame.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

});