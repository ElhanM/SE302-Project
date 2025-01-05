import { Locator, Page } from '@playwright/test'
import { ProductPage } from './ProductPage'

export class CategoryPage extends ProductPage {
  readonly page: Page
  readonly quantityInput: Locator
  readonly headerToggle: Locator
  readonly filterPanel: Locator
  blueColorCheckbox: Locator
  pinkColorCheckbox: Locator
  minPriceInput: Locator
  clearAllButton: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.quantityInput = page.locator('#content td input')
    this.headerToggle = this.page.locator('.fas.fa-chevron-circle-down.ml-auto')
    this.filterPanel = this.page.locator('#mz-filter-content-0')
    this.blueColorCheckbox = page.locator('#mz-fc-1-32')
    this.pinkColorCheckbox = page.locator('#mz-fc-1-28')
    this.minPriceInput = page.locator(
      '#mz-filter-panel-0-0 input[name="mz_fp[min]"]',
    )
    this.clearAllButton = page.locator(
      'span[data-mz-reset="all"] i.fas.fa-times',
    )
  }

  async navigateToLaptopsAndNotebooks() {
    await this.page.goto('/index.php?route=product/category&path=18')
  }

  async checkBox(checkbox: Locator) {
    // Resolve the checkbox locator to a CSS selector string
    const checkboxSelector = await checkbox.evaluate((node) => node.id) // or you can use 'node.querySelector' for a more specific selector

    // Try to interact with the checkbox directly in the DOM without relying on scrolling
    await this.page.evaluate((checkboxSelector) => {
      const checkbox = document.querySelector(
        `#${checkboxSelector}`,
      ) as HTMLInputElement
      if (checkbox && !checkbox.checked) {
        checkbox.checked = true // Manually check the checkbox
        checkbox.dispatchEvent(new Event('change')) // Trigger the 'change' event
      }
    }, checkboxSelector)
  }
}
