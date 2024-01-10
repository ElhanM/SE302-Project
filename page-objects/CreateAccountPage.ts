import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CreateAccountPage extends AbstractPage {
    readonly createAccoutLink: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly confirmPassword: Locator
    readonly submitButton: Locator
    readonly successMessage: Locator
    readonly alreadyExistsMessage: Locator
    readonly requiredFIeldMissing: Locator
    readonly invalidEmail: Locator

    constructor(page: Page){
        super(page)
        this.createAccoutLink = page.locator('text=Create an Account').first()
        this.firstName = page.locator('#firstname')
        this.lastName = page.locator('#lastname')
        this.emailInput = page.locator('#email_address')
        this.passwordInput = page.locator('#password')
        this.confirmPassword = page.locator('#password-confirmation')
        this.submitButton = page.locator('.action.submit.primary')
        this.successMessage = page.locator('.message-success.success.message')
        this.alreadyExistsMessage = page.locator('.message-error.error.message')
        this.requiredFIeldMissing = page.locator('.merge-error')
        this.invalidEmail = page.locator('#email_address-error')

    }

    async createAccount(firstname: string, lastname: string, email: string, password: string, confirmpassword: string){
        await this.createAccoutLink.click()
        await this.firstName.type(firstname)
        await this.lastName.type(lastname)
        await this.emailInput.type(email)
        await this.passwordInput.type(password)
        await this.confirmPassword.type(confirmpassword)
        await this.submitButton.click()  
    }


    async assertSuccesMessage(){
        await expect(this.successMessage).toContainText('Thank you for registering with Main Website Store.')
    }

    async assertAlreadyExistsMessage(){
        await expect(this.alreadyExistsMessage).toContainText('There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account')
    }

    async assertRequiredMissing(){
        await expect(this.requiredFIeldMissing).toBeVisible()
    }
    
    async assertInvalidEmail(){
        await expect(this.invalidEmail).toBeVisible()
    }

    
    

}