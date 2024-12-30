import { Page } from '@playwright/test'
import { SearchablePage } from './SearchablePage'

export class HomePage extends SearchablePage {
  constructor(page: Page) {
    super(page)
  }

  async visit() {
    // Because of baseURL in the config file
    await this.page.goto('/')
  }
}
