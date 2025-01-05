import { test, expect } from '@playwright/test'
import { CategoryPage } from '../../page-objects/CategoryPage'

test.describe('Searching filters', () => {
  let categoryPage: CategoryPage

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page)

    // Navigate to the desired category
    await categoryPage.navigateToLaptopsAndNotebooks()
    await page.waitForLoadState('networkidle')
  })

  test('should toggle filter groups on click', async ({ page }) => {
    await expect(categoryPage.filterPanel).toHaveClass(/show/) // Class contains "show"

    // Click to toggle visibility
    await categoryPage.headerToggle.click()

    await page.waitForTimeout(2000)

    // Wait for the panel's class to no longer include "show"
    await expect(categoryPage.filterPanel).not.toHaveClass(/show/)

    // Click again to toggle visibility back
    await categoryPage.headerToggle.click({ force: true })

    await page.waitForTimeout(2000)

    // Wait for the panel's class to include "show"
    await expect(categoryPage.filterPanel).toHaveClass(/show/)
  })

  test('should accept price inputs range', async ({ page }) => {
    const minPriceInput = page.locator(
      '#mz-filter-panel-0-0 input[name="mz_fp[min]"]',
    )

    await minPriceInput.fill('150')

    await expect(minPriceInput).toHaveValue('150') // Assuming '50' is out of range
  })

  test('should filter products by selected color', async ({ page }) => {
    // Check the checkboxes even if they are hidden
    await categoryPage.checkBox(categoryPage.blueColorCheckbox)
    await categoryPage.checkBox(categoryPage.pinkColorCheckbox)

    // Check if the checkboxes are checked
    const isBlueChecked = await categoryPage.blueColorCheckbox.isChecked()
    const isPinkChecked = await categoryPage.pinkColorCheckbox.isChecked()

    // Assert that both checkboxes are checked
    expect(isBlueChecked).toBe(true) // Ensure the blue color checkbox is checked
    expect(isPinkChecked).toBe(true) // Ensure the pink color checkbox is checked
  })

  test('should reset all filters when Clear All is clicked', async ({
    page,
  }) => {
    const minPriceInput = page.locator(
      '#mz-filter-panel-0-0 input[name="mz_fp[min]"]',
    )

    // Fill the price input
    await minPriceInput.fill('150')
    // Simulate pressing Enter after filling the input
    await minPriceInput.press('Enter')
    await expect(minPriceInput).toHaveValue('150') // Assuming '150' is in range

    await page.waitForTimeout(2000)

    const clearAllButton = page.locator(
      'span[data-mz-reset="all"] i.fas.fa-times',
    )
    await clearAllButton.waitFor({ state: 'visible' })
    await clearAllButton.click({ force: true })

    // Verify the value of the price input after clearing
    await expect(minPriceInput).toHaveValue('98') // Assuming '98' is the reset value
  })
})
