import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { MyAccountPage } from '../../page-objects/MyAccountPage'

test.use({ headless: true })

test.describe('My Account Navigation', () => {
  let homePage: HomePage
  let myAccountPage: MyAccountPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    myAccountPage = new MyAccountPage(page)
    await homePage.visit()
    await page.waitForLoadState('networkidle')
    await homePage.myAccount.click({
      force: true,
    }) // Accessing the myAccount locator
    await page.waitForLoadState('networkidle')
  })

  // Positive Tests: Pages that are accessible
  test.describe('Positive Tests', () => {
    test('should navigate to Register page from My Account', async ({
      page,
      baseURL,
    }) => {
      await myAccountPage.registerLink.click({ force: true })
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveURL(
        `${baseURL}/index.php?route=account/register`,
      )
    })

    test('should navigate to Login page from My Account', async ({
      page,
      baseURL,
    }) => {
      await myAccountPage.loginLink.click({ force: true })
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveURL(`${baseURL}/index.php?route=account/login`)
    })

    test('should navigate to Forgotten Password page from My Account', async ({
      page,
      baseURL,
    }) => {
      await myAccountPage.forgottenPasswordLink.click({ force: true })
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveURL(
        `${baseURL}/index.php?route=account/forgotten`,
      )
    })
  })

  // Negative Tests: Pages that redirect to login if not logged in
  test.describe('Negative Tests', () => {
    test('should not access Address Book page without login', async ({
      page,
      baseURL,
    }) => {
      await myAccountPage.addressBookLink.click({ force: true })
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveURL(`${baseURL}/index.php?route=account/login`)
    })

    test('should not access Transactions page from My Account if not logged in', async ({
      page,
      baseURL,
    }) => {
      await myAccountPage.transactionsLink.click({ force: true })
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveURL(`${baseURL}/index.php?route=account/login`)
    })
  })
})
