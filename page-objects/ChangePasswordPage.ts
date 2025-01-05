import { Page, Locator, expect } from '@playwright/test'

export class ChangePasswordPage {
  readonly page: Page
  readonly passwordInput: Locator
  readonly passwordConfirmInput: Locator
  readonly continueButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.passwordInput = page.getByPlaceholder('Password', { exact: true })
    this.passwordConfirmInput = page.getByPlaceholder('Password Confirm')
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.errorMessage = page.locator('.alert-danger')
  }

  async visit() {
    await this.page.goto('/index.php?route=account/password')
  }

  async changePassword(password: string, confirmPassword: string) {
    await this.passwordInput.fill(password)
    await this.passwordConfirmInput.fill(confirmPassword)
    await this.continueButton.click()
  }

  async assertErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toContainText(expectedMessage)
  }
}