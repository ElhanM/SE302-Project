import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { MyAccountPage } from '../../page-objects/MyAccountPage'

test.use({ headless: true })

test.describe('My Account Navigation', () => {
  let homePage: HomePage
  let myAccountPage: MyAccountPage

  const baseURL = 'https://ecommerce-playground.lambdatest.io'

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    myAccountPage = new MyAccountPage(page)
    await homePage.visit()
    await homePage.myAccount.click() // Accessing the myAccount locator
  })

  // Positive Tests: Pages that are accessible
  test.describe('Positive Tests', () => {
    test('should navigate to Register page from My Account', async ({
      page,
    }) => {
      await myAccountPage.clickRegister()
      await expect(page).toHaveURL(
        `${baseURL}/index.php?route=account/register`,
      )
    })

    test('should navigate to Login page from My Account', async ({ page }) => {
      await myAccountPage.clickLogin()
      await expect(page).toHaveURL(`${baseURL}/index.php?route=account/login`)
    })

    test('should navigate to Forgotten Password page from My Account', async ({
      page,
    }) => {
      await myAccountPage.clickForgottenPassword()
      await expect(page).toHaveURL(
        `${baseURL}/index.php?route=account/forgotten`,
      )
    })
  })

  // Negative Tests: Pages that redirect to login if not logged in
  test.describe('Negative Tests', () => {
    test('should not access Address Book page without login', async ({
      page,
    }) => {
      await myAccountPage.clickAddressBook()
      await expect(page).toHaveURL(`${baseURL}/index.php?route=account/login`)
      console.log('Negative test passed: Redirection to login page occurred')
    })

    test('should not access Transactions page from My Account if not logged in', async ({
      page,
    }) => {
      await myAccountPage.clickTransactions()
      await expect(page).toHaveURL(`${baseURL}/index.php?route=account/login`)
    })
  })
})
