import { Page, expect, Locator } from "@playwright/test";

export class CheckoutPage {

    page : Page;
    waitForElement : Locator;
    textCheck : Locator;
    dataField1 : Locator;
    dataField2 : Locator;
    countrySelector : Locator;
    submitButton : Locator;
    
    constructor(page : Page){
        this.page = page;
        this.waitForElement = this.page.locator(".payment__type").first();
        this.textCheck = this.page.locator(".user__name [type='text']").first();
        this.dataField1 = page.locator(".input").nth(3);
        this.dataField2 = page.locator(".input").nth(4);
        this.countrySelector = this.page.locator("[placeholder*=Country]");
        this.submitButton = this.page.locator(".action__submit");
    }

    async isEmailVisible(email : string){
        await this.waitForElement.waitFor();
        await expect(this.textCheck).toHaveText(email);
    }

    async fillInformation(str1 : string, str2 : string){
        await this.dataField1.fill(str1);
        await this.dataField2.fill(str2);
    }
    
    async selectCountry(enterString : string, countryString : string){
        await this.countrySelector.pressSequentially(enterString);
        await this.page.getByRole("button", {name: countryString}).click();
    }

    async submitOrder(){
        await this.dataField1.click();
        await this.submitButton.click();
    }
}