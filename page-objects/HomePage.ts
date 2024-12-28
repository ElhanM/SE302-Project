import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly searchBox: Locator
  readonly searchButton: Locator

  constructor(page: Page) {
    this.page = page
    this.searchBox = page.locator('input[name="search"]').first()
    this.searchButton = page.locator('button[type="submit"].type-text')
  }

  async visit() {
    // Because of baseURL in the config file
    await this.page.goto('/')
  }

  async searchFor(phrase: string) {
    await this.searchBox.click()
    await this.searchBox.fill(phrase)
    await this.searchButton.click()
  }
}
