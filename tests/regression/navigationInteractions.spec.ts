import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Navigation Menu Interaction', () => {
  test('Menu links lead to correct categories', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.visit()
    const categories = ['Laptops & Notebooks', 'Components', 'Tablets']
    for (const category of categories) {
      await page.locator(`text=${category}`).click()
      await expect(page.locator('h2')).toHaveText(category)
      await homePage.visit()
    }
  })
})
