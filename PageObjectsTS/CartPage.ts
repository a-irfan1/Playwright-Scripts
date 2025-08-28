import { Page, expect, Locator } from "@playwright/test";

export class CartPage {
    page : Page;
    waitForElement : Locator;
    checkoutButton : Locator;

    constructor(page : Page){
        this.page = page;
        this.waitForElement = this.page.locator("div img").first();
        this.checkoutButton = this.page.locator("text=Checkout");
    }

    async isProductVisible(productName : string){
        await this.waitForElement.waitFor();
        const bool = await this.page.getByRole("heading").filter({hasText: productName}).isVisible();
        // const bool = await this.page.locator("h3:has-text(" + productName + ")").isVisible();
        expect(bool).toBeTruthy();
    }

    async goToCheckout(){
        await this.checkoutButton.click();
    }
}