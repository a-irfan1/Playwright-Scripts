class LoginPage{
    constructor(page){
        this.page = page;
        this.emailField = page.locator('#userEmail');
        this.passwordField = page.locator('#userPassword');
        this.signInButton = page.locator('#login');
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async login(email, password){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}

module.exports = {LoginPage}