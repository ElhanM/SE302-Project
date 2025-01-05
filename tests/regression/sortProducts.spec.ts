import { test, expect } from '@playwright/test'
import { SortingProduct } from '../../page-objects/SortingProduct'

test.describe('Product Sorting Functionality', () => {
  test('Sort Products by Price (Low to High)', async ({ page }) => {
    const sortingProductPage = new SortingProduct(page)
    await sortingProductPage.navigateToLaptopsAndNotebooks()
    await sortingProductPage.sortProductsBy('price-ASC')
    const isSortedAscending =
      await sortingProductPage.validatePricesAreSortedAscending()
    expect(isSortedAscending).toBeTruthy()
  })
})
