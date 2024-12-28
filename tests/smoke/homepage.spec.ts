import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Home Page', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.visit()
  })

  test('should load home page', async ({ page, baseURL }) => {
    await expect(page).toHaveURL(baseURL as string)
  })
})