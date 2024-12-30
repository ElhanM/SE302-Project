import { Locator, Page } from '@playwright/test'

export class SearchablePage {
  readonly page: Page
  readonly searchBox: Locator
  readonly searchButton: Locator

  constructor(page: Page) {
    this.page = page
    this.searchBox = page.locator('input[name="search"]').first()
    this.searchButton = page.locator('button[type="submit"].type-text')
  }

  async searchFor(phrase: string) {
    await this.searchBox.click({
      force: true,
    })
    await this.searchBox.fill(phrase)
    await this.searchButton.click({
      force: true,
    })
  }
}
