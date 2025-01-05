import { test, expect } from '@playwright/test'
import { CategoryPage } from '../../page-objects/CategoryPage'

test.describe('Positive tests - Searching filters', () => {
  let categoryPage: CategoryPage

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page)

    // Navigate to the desired category
    await categoryPage.navigateToLaptopsAndNotebooks()
    await page.waitForLoadState('networkidle')
  })

  test('should toggle filter groups on click', async ({ page }) => {
    const headerToggle =
      // Ensure the filter panel starts as visible
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

  //   test('should not accept price inputs outside range', async ({ page }) => {
  //     const minInput = page.locator('input[placeholder="Minimum Price"]');

  //     // Attempt to input an out-of-range value
  //     await minInput.fill('50');
  //     await expect(minInput).not.toHaveValue('50'); // Assuming '50' is out-of-range
  //   });

  //   test('should check and uncheck manufacturer options', async ({ page }) => {
  //     const checkbox = page.locator('label:text("Apple") >> input[type="checkbox"]');

  //     // Check the checkbox
  //     await checkbox.click();
  //     await expect(checkbox).toBeChecked();

  //     // Uncheck the checkbox
  //     await checkbox.click();
  //     await expect(checkbox).not.toBeChecked();
  //   });

  //   test('should reset all filters when Clear All is clicked', async ({ page }) => {
  //     const resetButton = page.locator('text=Clear all');
  //     const resetPanel = page.locator('[data-testid="mz-filter-reset"]');

  //     await resetButton.click();
  //     await expect(resetPanel).toHaveClass(/d-none/); // Verify the reset panel is hidden
  //   });
})
