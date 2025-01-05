import { Page, Locator } from '@playwright/test'

export class SortingProduct {
  readonly page: Page
  readonly sortSelector: Locator
  constructor(page: Page) {
    this.page = page
    this.sortSelector = page.locator('select[name="sort"]')
  }
  async navigateToLaptopsAndNotebooks() {
    await this.page.goto('/index.php?route=product/category&path=18')
  }
  async sortProductsBy(optionValue: string) {
    await this.sortSelector.selectOption(optionValue)
    await this.page.waitForSelector('.product-layout')
  }
  async validatePricesAreSortedAscending() {
    const prices = await this.page.$$eval('.price', (elements) =>
      elements.map((el) =>
        parseFloat(el.textContent?.replace(/[^\d\.]/g, '') || '0'),
      ),
    )
    let sorted = true
    for (let i = 0; i < prices.length - 1; i++) {
      if (prices[i] > prices[i + 1]) {
        sorted = false
        break
      }
    }
    return sorted
  }
}
