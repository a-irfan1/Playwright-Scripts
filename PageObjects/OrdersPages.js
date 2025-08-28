const { expect } = require("@playwright/test");

class OrdersPages {
    constructor(page){
        this.page = page;
        this.heroText = this.page.locator(".hero-primary");
        this.orderIDText = this.page.locator(".em-spacer-1 .ng-star-inserted");
        this.allOrders = this.page.locator("[routerlink*='myorders']").first();
        this.waitForElement = this.page.locator("tbody");
        this.checkText = page.locator(".col-text");
        
    }

    async checkThankyou(){
        await expect(this.heroText).toContainText("Thankyou");
    }

    async getAndCheckOrderID(){
        const orderID = await this.orderIDText.textContent();
        await this.allOrders.click();
        await this.waitForElement.waitFor();
        const rows = await this.page.locator("tbody tr");

        for (let i = 0; i < await rows.count(); i++){
            if (orderID.includes(await rows.nth(i).locator("th").textContent())){
                await rows.nth(i).locator(".btn-primary").click();
                break;
            }
        }

        expect(orderID.includes(await this.checkText.textContent())).toBeTruthy();
    }
}

module.exports = {OrdersPages}