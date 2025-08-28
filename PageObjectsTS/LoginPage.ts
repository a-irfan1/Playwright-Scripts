import { Page, Locator } from "@playwright/test";

export class LoginPage{

    page : Page;
    emailField : Locator;
    passwordField : Locator;
    signInButton : Locator;

    constructor(page : Page){
        this.page = page;
        this.emailField = page.locator('#userEmail');
        this.passwordField = page.locator('#userPassword');
        this.signInButton = page.locator('#login');
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async login(email : string, password : string){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}