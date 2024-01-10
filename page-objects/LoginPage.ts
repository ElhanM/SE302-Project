import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage{
    readonly page: Page
    readonly signInLink: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator
    readonly errorMessage: Locator
    readonly succesMessage: Locator
    readonly dropDownMenu: Locator
    readonly logOutDrop: Locator
    readonly missingPass: Locator
    readonly invalidData: Locator

    constructor(page: Page){
        super(page)
        this.signInLink = page.locator('[href*="https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/"]').first()
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('input[id="pass"]').first()
        this.signInButton = page.locator('#send2').first()
        this.errorMessage = page.locator('.message-error')
        this.succesMessage = page.locator('.greet.welcome .logged-in').first()
        this.dropDownMenu = page.locator('.action.switch').first()
        this.logOutDrop = page.locator('.authorization-link').first()
        this.missingPass = page.locator('#pass-error').first()
        this.invalidData = page.locator('mage-error')
    }

    async signIn(email: string, password: string){
        await this.signInLink.click()
        await this.emailInput.type(email)
        await this.passwordInput.type(password)
        await this.signInButton.click()  
    }

    async logOut(){
        await this.dropDownMenu.click()
        await this.logOutDrop.click()
    }

    async assertErrorMessage(){
        await expect(this.errorMessage).toContainText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    }

    async assertSuccesMessage(){
        await expect(this.succesMessage).toContainText('Welcome, hamza susic!')
    }

    async assertMissingField(){
        await expect(this.missingPass).toContainText('This is a required field.')
    }

    async assertInvalidData(){
        await expect(this.invalidData).toBeVisible()
    }
    
    

}