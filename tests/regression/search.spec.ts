import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Search Functionality', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.visit()
  })

  test('should search for a product', async ({ page }) => {
    await homePage.searchFor('iMac')
  })
})
