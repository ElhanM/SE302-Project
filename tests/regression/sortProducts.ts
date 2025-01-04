import { test, expect } from '@playwright/test'

test.describe('Product Sorting Functionality', () => {
  test('Sort Products by Price (Low to High)', async ({ page }) => {
    await page.goto(
      'https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18',
    )
    await page.locator('select[name="sort"]').selectOption('price-ASC')
    await page.waitForSelector('.product-layout')
    const prices = await page.$$eval('.price', (elements) =>
      elements.map((el) => parseFloat(el.textContent.replace(/[^\d\.]/g, ''))),
    )
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1])
    }
  })
})
