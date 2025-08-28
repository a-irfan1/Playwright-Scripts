const { expect } = require("@playwright/test");

class CartPage {
    constructor(page){
        this.page = page;
        this.waitForElement = this.page.locator("div img").first();
        this.checkoutButton = this.page.locator("text=Checkout");
    }

    async isProductVisible(productName){
        await this.waitForElement.waitFor();
        const bool = await this.page.getByRole("heading").filter({hasText: productName}).isVisible();
        // const bool = await this.page.locator("h3:has-text(" + productName + ")").isVisible();
        expect(bool).toBeTruthy();
    }

    async goToCheckout(){
        await this.checkoutButton.click();
    }
}

module.exports = {CartPage}