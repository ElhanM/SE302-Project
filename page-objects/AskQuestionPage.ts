import { Page, Locator, expect } from '@playwright/test'

export class AskQuestionPage {
  readonly page: Page
  readonly askQuestionButton: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly messageInput: Locator
  readonly sendMessageButton: Locator
  readonly successMessage: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.askQuestionButton = page.getByLabel('Ask Question')
    this.nameInput = page.getByPlaceholder('Your name', { exact: true })
    this.emailInput = page.getByPlaceholder('Your email')
    this.subjectInput = page.getByPlaceholder('Subject')
    this.messageInput = page.getByPlaceholder('Message')
    this.sendMessageButton = page.getByRole('button', { name: 'Send message' })
    this.successMessage = page.locator(
      '.alert.alert-success.alert-notification',
    )
    this.errorMessage = page.locator('.error.text-danger')
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ) {
    if (name) await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.subjectInput.fill(subject)
    await this.messageInput.fill(message)
  }

  async verifySuccessMessage(expectedText: string) {
    await expect(this.successMessage).toBeVisible()
    await expect(this.successMessage).toContainText(expectedText)
  }

  async verifyErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toHaveText(expectedText)
  }
}
