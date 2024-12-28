import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('#input-email')
    this.passwordInput = page.locator('#input-password')
    this.loginButton = page.locator('input[value="Login"]')
    this.errorMessage = page.locator('.alert-danger')
  }

  async visit() {
    await this.page.goto('/index.php?route=account/login')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toBeVisible()
  }

  async assertSuccessfulLogin(baseURL: string) {
    await expect(this.page).toHaveURL(baseURL + '/index.php?route=account/account')
  }
}
