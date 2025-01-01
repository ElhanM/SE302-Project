import { Locator, Page } from '@playwright/test'
import { SearchablePage } from './SearchablePage'

export class HomePage extends SearchablePage {
  readonly logo: Locator
  readonly cartIcon: Locator
  readonly myAccount: Locator
  readonly carouselBanner: Locator
  readonly topProducts: Locator
  readonly shopByCategory: Locator

  constructor(page: Page) {
    super(page)
    this.logo = page.locator('a[title="Poco Electro"]')
    this.cartIcon = page.locator('div.cart-icon').first()
    this.myAccount = page.locator(
      'li.nav-item.dropdown.dropdown-hoverable span.title',
      { hasText: 'My account' },
    )
    this.carouselBanner = page.locator('div.carousel-inner').first()
    this.topProducts = page.locator('h3.module-title', {
      hasText: 'Top Products',
    })
    this.shopByCategory = page.locator('text=Shop by Category')
  }

  async visit() {
    // Because of baseURL in the config file
    await this.page.goto('/')
  }
}
