const {LoginPage} = require("../PageObjects/LoginPage.js");
const {DashboardPage} = require("../PageObjects/DashboardPage.js");
const {CartPage} = require("../PageObjects/CartPage.js");
const {CheckoutPage} = require("../PageObjects/CheckoutPage.js");
const {OrdersPages} = require("../PageObjects/OrdersPages.js");

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.ordersPages = new OrdersPages(page);
    }

    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getCheckoutPage(){
        return this.checkoutPage;
    }
    getOrdersPages(){
        return this.ordersPages;
    }
}

module.exports = {POManager}