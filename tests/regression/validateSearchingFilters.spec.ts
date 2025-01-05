import { test, expect } from '@playwright/test'
import { CategoryPage } from '../../page-objects/CategoryPage'

test.describe('Shipping Funcionality', () => {
  let categoryPage: CategoryPage

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page)

    // Navigate to the desired category
    await categoryPage.navigateToLaptopsAndNotebooks()
    await page.waitForLoadState('networkidle')
  })

  test('All input fields - Positive', async ({ page }) => {})

  test('Invalid address field - Negative', async ({ page }) => {})
})
