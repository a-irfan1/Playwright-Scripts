import { Page, Locator } from "@playwright/test";

export class DashboardPage{

    page : Page;
    products : Locator;
    cartLink : Locator;

    constructor(page : Page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.cartLink = page.locator("[routerlink*='cart']");
    }

    async searchAndAddToCart(productName : string){
        await this.page.waitForLoadState('networkidle');
        await this.products.first().waitFor();
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text = Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cartLink.click();
    }
}