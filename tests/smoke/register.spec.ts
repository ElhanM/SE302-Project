import { test, expect } from '@playwright/test'
import { RegisterPage } from '../../page-objects/RegisterPage'

test.describe('Register Page', () => {
  let registerPage: RegisterPage

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page)
    await registerPage.visit()
  })

  test('should load register page', async ({ page, baseURL }) => {
    await expect(page).toHaveURL(baseURL + '/index.php?route=account/register')
  })

  test('should throw an error when trying to register with an already registered email', async () => {
    await registerPage.register('John', 'Doe', 'john.doe@example.com', '1234567890', 'Password123')
    await registerPage.assertEmailAlreadyRegisteredMessage()
  })
})