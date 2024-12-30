import { test, expect } from '@playwright/test'
import { ProductPage } from '../../page-objects/ProductPage'

test.describe('Search Functionality - Product Search and Navigation', () => {
  let productPage: ProductPage

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page)
    await productPage.visit()
  })

  // Assuming search for iMac returns at least one product
  test('should display product details', async ({ page }) => {
    await productPage.searchFor('iMac')
    await expect(productPage.productGrid).toBeVisible()
    await expect(productPage.products.first()).toBeVisible()

    const firstProduct = productPage.products.first()
    const firstProductTitle = await productPage.getProductTitle(firstProduct)
    const firstProductPrice = await productPage.getProductPrice(firstProduct)

    expect(await firstProductTitle.innerText()).toBe('iMac')
    expect(await firstProductPrice.innerText()).toContain('$')
    await expect(productPage.noResultsMessage).not.toBeVisible()
  })

  test('should navigate to product details page on title click', async ({
    page,
  }) => {
    await productPage.searchFor('iMac')

    const firstProduct = productPage.products.first()
    const firstProductTitle = await productPage.getProductTitle(firstProduct)

    await firstProductTitle.click({
      force: true,
    })
    expect(page.url()).toContain('route=product/product')
  })

  // now test for not results
  test('should display no results message when no products are found', async ({
    page,
  }) => {
    await productPage.searchFor('this search should not return any results')
    await expect(productPage.noResultsMessage).toBeVisible()
  })
})
