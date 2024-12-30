import { Locator, Page } from '@playwright/test'
import { SearchablePage } from './SearchablePage'

export class ProductPage extends SearchablePage {
  readonly productGrid: Locator
  readonly products: Locator

  constructor(page: Page) {
    super(page)
    this.productGrid = page.locator('div.row[data-view_id="grid"]')
    this.products = this.productGrid.locator(
      'div.product-layout.product-grid.no-desc',
    )
  }

  async visit() {
    // Takes you to the product search page, showing no results, until we search for something
    await this.page.goto('/index.php?route=product%2Fsearch')
  }

  async getProductTitle(product: Locator) {
    const titleLocator = product.locator(
      'div.caption h4.title a.text-ellipsis-2',
    )
    return titleLocator
  }

  async getProductPrice(product: Locator) {
    const priceLocator = product.locator('div.caption div.price span.price-new')
    return priceLocator
  }
}
