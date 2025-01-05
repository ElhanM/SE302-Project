import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login Page', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.visit()
  })

  test('should load login page', async ({ page, baseURL }) => {
    await expect(page).toHaveURL(baseURL + '/index.php?route=account/login')
  })

  test('should display error message for login with invalid credentials', async ({
    page,
  }) => {
    await loginPage.login('ius-invalid@example.com', 'invalidpassword')
    await page.waitForLoadState('networkidle')
    await loginPage.assertErrorMessage()
  })

  test('should redirect to account page for login with valid credentials', async ({
    page,
    baseURL,
  }) => {
    await loginPage.login('ius-project2@test.com', 'ius-project')
    await page.waitForLoadState('networkidle')
    await loginPage.assertSuccessfulLogin(baseURL as string)
  })
})
