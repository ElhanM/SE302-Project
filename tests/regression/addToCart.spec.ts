import { test, expect } from '@playwright/test'
import { CategoryPage } from '../../page-objects/CategoryPage'
import { CheckoutPage } from '../../page-objects/CheckoutPage'
import { ProductDetailsPage } from '../../page-objects/ProductDetailsPage'

test.describe('Add to cart', () => {
  let categoryPage: CategoryPage
  let checkoutPage: CheckoutPage
  let productDetailsPage: ProductDetailsPage

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page)
    checkoutPage = new CheckoutPage(page)
    productDetailsPage = new ProductDetailsPage(page)
    await categoryPage.navigateToLaptopsAndNotebooks()
  })

  test('Add to cart', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const firstProduct = categoryPage.products.first()
    const firstProductTitle = await categoryPage.getProductTitle(firstProduct)
    await expect(firstProductTitle).toBeVisible()
    await firstProductTitle.click({ force: true })

    await page.waitForLoadState('networkidle')

    const addToCartButton = productDetailsPage.addToCartButton
    await expect(addToCartButton).toBeVisible()
    await addToCartButton.click({ force: true })

    await page.waitForTimeout(1000)

    const viewCartButton = productDetailsPage.viewCartButton
    await expect(viewCartButton).toBeVisible()
    await viewCartButton.click({ force: true })

    await page.waitForLoadState('networkidle')

    await expect(checkoutPage.quantityInput).toBeVisible()
    await expect(checkoutPage.quantityInput).toHaveValue('1')
  })
})
