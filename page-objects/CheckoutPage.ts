import { Locator, Page } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page
  readonly quantityInput: Locator

  constructor(page: Page) {
    this.page = page
    this.quantityInput = page.locator('#content td input')
  }

  async visit() {
    await this.page.goto('/index.php?route=checkout/cart')
  }
}
