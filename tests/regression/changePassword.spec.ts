import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ChangePasswordPage } from '../../page-objects/ChangePasswordPage'
import { MyAccountPage } from '../../page-objects/MyAccountPage'

test.describe('Change Password', () => {
  let loginPage: LoginPage
  let changePasswordPage: ChangePasswordPage
  let myAccountPage: MyAccountPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    changePasswordPage = new ChangePasswordPage(page)
    myAccountPage = new MyAccountPage(page)
    await loginPage.visit()
    await loginPage.login('changePasswordTest@test.com', 'lockedinalien')
    await page.waitForLoadState('networkidle')
    await myAccountPage.changePasswordLink.click({ force: true })
    await page.waitForLoadState('networkidle')
  })

  test('should change password successfully', async ({ page }) => {
    await changePasswordPage.changePassword('lockedinalien', 'lockedinalien')
    await changePasswordPage.assertSuccessMessage()
  })

  test('should display error message for password shorter than 4 characters', async ({
    page,
  }) => {
    await changePasswordPage.changePassword('ew', 'ew')
    await changePasswordPage.assertErrorMessage('Password must be between 4')
  })

  test('should display error message for non-matching passwords', async ({
    page,
  }) => {
    await changePasswordPage.changePassword('lockedin', 'lockedinalien')
    await changePasswordPage.assertErrorMessage('Password confirmation does')
  })
})
