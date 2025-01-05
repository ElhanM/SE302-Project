// page-objects/ChangePasswordPage.ts
import { Page, Locator, expect } from '@playwright/test'

export class ChangePasswordPage {
  readonly page: Page
  readonly passwordInput: Locator
  readonly passwordConfirmInput: Locator
  readonly continueButton: Locator
  readonly errorMessage: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.passwordInput = page.getByPlaceholder('Password', { exact: true })
    this.passwordConfirmInput = page.getByPlaceholder('Password Confirm')
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.errorMessage = page.locator('.text-danger')
    this.successMessage = page.locator('.alert-success')
  }

  async visit() {
    await this.page.goto('/index.php?route=account/password')
  }

  async changePassword(password: string, confirmPassword: string) {
    await this.passwordInput.fill(password)
    await this.passwordConfirmInput.fill(confirmPassword)
    await this.continueButton.click({ force: true })
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toContainText(
      'Success: Your password has',
    )
  }

  async assertErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toContainText(expectedMessage)
  }
}
