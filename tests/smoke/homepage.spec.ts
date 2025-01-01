import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Home Page', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.visit()
  })

  test('verify that the main parts of the home page are visible', async ({
    page,
    baseURL,
  }) => {
    await expect(page).toHaveURL(baseURL as string)
    await expect(page).toHaveTitle('Your Store')
    await expect(homePage.logo).toBeVisible()
    await expect(homePage.searchBox).toBeVisible()
    await expect(homePage.cartIcon).toBeVisible()
    await expect(homePage.myAccount).toBeVisible()
    await expect(homePage.carouselBanner).toBeVisible()
    await expect(homePage.topProducts).toBeVisible()
    await expect(homePage.shopByCategory).toBeVisible()
  })
})
