const { expect } = require("@playwright/test");

class CheckoutPage {
    constructor(page){
        this.page = page;
        this.waitForElement = this.page.locator(".payment__type").first();
        this.textCheck = this.page.locator(".user__name [type='text']").first();
        this.dataField1 = page.locator(".input").nth(3);
        this.dataField2 = page.locator(".input").nth(4);
        this.countrySelector = this.page.locator("[placeholder*=Country]");
        this.submitButton = this.page.locator(".action__submit");
    }

    async isEmailVisible(email){
        await this.waitForElement.waitFor();
        await expect(this.textCheck).toHaveText(email);
    }

    async fillInformation(str1, str2){
        await this.dataField1.fill(str1);
        await this.dataField2.fill(str2);
    }
    
    async selectCountry(enterString, countryString){
        await this.countrySelector.pressSequentially(enterString);
        await this.page.getByRole("button", {name: " Pakistan"}).click();
    }

    async submitOrder(){
        await this.dataField1.click();
        await this.submitButton.click();
    }
}

module.exports = {CheckoutPage}