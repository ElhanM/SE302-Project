import { Page, Locator, expect } from '@playwright/test'

export class AddressPage {
  readonly page: Page
  readonly deleteButton: Locator
  readonly successMessage: Locator
  readonly editButton: Locator

  constructor(page: Page) {
    this.page = page
    this.successMessage = page.getByText('Your address has been')
    this.deleteButton = page.locator('a.btn.btn-danger').last() // Target the last delete button
    this.editButton = page.locator('text=Edit')
  }

  async visit() {
    await this.page.goto('/index.php?route=account/address')
    await this.page.waitForLoadState('networkidle')
  }

  async deleteAddress() {
    await expect(this.deleteButton).toBeVisible()
    await this.deleteButton.click()
    await this.page.waitForLoadState('networkidle')
  }

  async editAddress() {
    await expect(this.editButton).toBeVisible()
    await this.editButton.click()
    await this.page.waitForLoadState('networkidle')
  }
}
