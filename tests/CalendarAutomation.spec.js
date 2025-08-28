const {test, expect} = require('@playwright/test');

test.only("Calendar Automation", async ({page}) => {
    const date = "27";
    const month = "4";
    const year = "2009";
    const validationList = [month,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.waitForLoadState('networkidle');
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__prev-button").click();
    await page.locator(".react-calendar__navigation__prev-button").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const checkList = await page.locator(".react-date-picker__inputGroup__input");

    for (let i = 0; i < 3; i++){
        const value = await checkList.nth(i).getAttribute("value");
        console.log(value);
        expect(value).toEqual(validationList[i]);
    }
});