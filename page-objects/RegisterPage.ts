import { expect, Locator, Page } from '@playwright/test'

export class RegisterPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailInput: Locator
  readonly telephoneInput: Locator
  readonly passwordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly privacyPolicyCheckbox: Locator
  readonly continueButton: Locator
  readonly successMessage: Locator
  readonly failureMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameInput = page.locator('input[name="firstname"]')
    this.lastNameInput = page.locator('input[name="lastname"]')
    this.emailInput = page.locator('input[name="email"]')
    this.telephoneInput = page.locator('input[name="telephone"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.confirmPasswordInput = page.locator('input[name="confirm"]')
    this.privacyPolicyCheckbox = page.locator('label[for="input-agree"]')
    this.continueButton = page.locator('input[value="Continue"]')
    this.successMessage = page.locator('.alert-success')
    this.failureMessage = page.locator('.alert-danger')
  }

  async visit() {
    await this.page.goto('/index.php?route=account/register')
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    password: string,
  ) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.emailInput.fill(email)
    await this.telephoneInput.fill(telephone)
    await this.passwordInput.fill(password)
    await this.confirmPasswordInput.fill(password)
    await this.privacyPolicyCheckbox.check({
      force: true,
    })
    await this.continueButton.click({
      force: true,
    })
  }

  // DOCS:
  // Testing for successfull registration is a bit tricky because the email address should be unique every time
  // Providing random credentials could result in flaky tests
  async assertSuccessMessage() {
    await expect(this.successMessage).toBeVisible()
    await expect(this.successMessage).toContainText(
      'Your Account Has Been Created!',
    )
  }

  async assertEmailAlreadyRegisteredMessage() {
    await expect(this.failureMessage).toBeVisible()
  }
}
