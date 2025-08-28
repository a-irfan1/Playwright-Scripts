import { Page } from "@playwright/test";
import {LoginPage} from "../PageObjectsTS/LoginPage";
import {DashboardPage} from "../PageObjectsTS/DashboardPage";
import {CartPage} from "../PageObjectsTS/CartPage";
import {CheckoutPage} from "../PageObjectsTS/CheckoutPage";
import {OrdersPages} from "../PageObjectsTS/OrdersPages";

export class POManager{

    page : Page;
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    cartPage : CartPage;
    checkoutPage : CheckoutPage;
    ordersPages : OrdersPages;

    constructor(page : Page){
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