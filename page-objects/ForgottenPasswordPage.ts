import { expect, Locator, Page } from '@playwright/test'

export class ForgottenPasswordPage {
  readonly page: Page
  readonly continueButton: Locator
  readonly errorMessage: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.continueButton = page.locator('button:has-text("Continue")')
    this.errorMessage = page.locator('.alert-danger')
    this.successMessage = page.locator('.alert-success')
  }
}
