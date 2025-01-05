import { Locator, Page } from '@playwright/test'
import { ProductPage } from './ProductPage'

export class CategoryPage extends ProductPage {
  readonly page: Page
  readonly quantityInput: Locator
  readonly headerToggle: Locator
  readonly filterPanel: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.quantityInput = page.locator('#content td input')
    this.headerToggle = this.page.locator('.fas.fa-chevron-circle-down.ml-auto')
    this.filterPanel = this.page.locator('#mz-filter-content-0')
  }

  async navigateToLaptopsAndNotebooks() {
    await this.page.goto('/index.php?route=product/category&path=18')
  }
}
