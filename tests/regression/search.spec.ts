import { test, expect } from '@playwright/test'
import { ProductPage } from '../../page-objects/ProductPage'

test.describe('Search Functionality', () => {
  let productPage: ProductPage

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page)
    await productPage.visit()
  })

  // Assuming search for iMac returns at least one product
  test.only('should display product details', async ({ page }) => {
    await productPage.searchFor('iMac')
    await expect(productPage.productGrid).toBeVisible()
    await expect(productPage.products.first()).toBeVisible()

    const firstProduct = productPage.products.first()
    const firstProductTitle = await productPage.getProductTitle(firstProduct)
    const firstProductPrice = await productPage.getProductPrice(firstProduct)

    expect(firstProductTitle.innerText()).toBe('iMac')
    expect(firstProductPrice.innerText()).toContain('$')
  })
})
