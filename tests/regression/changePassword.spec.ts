import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ChangePasswordPage } from '../../page-objects/ChangePasswordPage'

test.describe('Change Password', () => {
  let loginPage: LoginPage
  let changePasswordPage: ChangePasswordPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    changePasswordPage = new ChangePasswordPage(page)
    await loginPage.visit()
    await loginPage.login('changePasswordTest@test.com', 'lockedinalien')
    await page.locator('#content div').filter({ hasText: 'Change your password' }).nth(3).click()
  })

  test('should change password successfully', async ({ page }) => {
    await changePasswordPage.changePassword('lockedinalien', 'lockedinalien')
    await page.getByText('Success: Your password has').click()
  })

  test('should display error message for password shorter than 4 characters', async ({ page }) => {
    await changePasswordPage.changePassword('ew', 'ew')
    await page.getByText('Password must be between 4').click()
  })

  test('should display error message for non-matching passwords', async ({ page }) => {
    await changePasswordPage.changePassword('lockedin', 'lockedinalien')
    await page.getByText('Password confirmation does').click()
  })
})