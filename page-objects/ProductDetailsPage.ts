import { Locator, Page } from '@playwright/test'

export class ProductDetailsPage {
  readonly page: Page
  readonly addToCartButton: Locator
  readonly viewCartButton: Locator

  constructor(page: Page) {
    this.page = page
    this.addToCartButton = page.locator('button[title="Add to Cart"]').nth(1)
    this.viewCartButton = page.locator('text=View Cart')
  }
}
