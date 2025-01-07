import { Page, Locator, expect } from '@playwright/test'

export class NewsLetterSubscriptionPage {
  readonly page: Page
  readonly subscribeOption: Locator
  readonly unsubscribeOption: Locator
  readonly continueButton: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.subscribeOption = page.getByRole('group').locator('div').nth(2)
    this.unsubscribeOption = page.getByRole('group').locator('div').nth(3)
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.successMessage = page.getByText('Success: Your newsletter')
  }

  async visit() {
    await this.page.goto(`/index.php?route=account/newsletter`)
  }

  async subscribe() {
    await this.subscribeOption.click({ force: true })
    await this.continueButton.click({ force: true })
  }

  async unsubscribe() {
    await this.unsubscribeOption.click({ force: true })
    await this.continueButton.click({ force: true })
  }
}
