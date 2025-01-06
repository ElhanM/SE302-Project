import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ForgottenPasswordPage } from '../../page-objects/ForgottenPasswordPage'

test.describe('Forgotten Password Flow', () => {
  let loginPage: LoginPage
  let forgottenPaswordPage: ForgottenPasswordPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    forgottenPaswordPage = new ForgottenPasswordPage(page)
    await loginPage.visit()

    await page.waitForLoadState('networkidle')

    await loginPage.forgottenPasswordLink.click({ force: true })

    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/route=account\/forgotten/)

    await expect(loginPage.forgottenEmailInput).toBeVisible()
  })

  test('Negative', async () => {
    await loginPage.forgottenEmailInput.fill('test@my-example.com')

    await forgottenPaswordPage.continueButton.click({ force: true })

    await forgottenPaswordPage.errorMessage.waitFor({
      state: 'visible',
      timeout: 5000,
    })
    console.log('Error message displayed')

    await expect(forgottenPaswordPage.errorMessage).toContainText(
      /warning|not found|error/i,
    )
  })

  test('Positive', async () => {
    await loginPage.forgottenEmailInput.fill('mustafasinanovic@outlook.com')

    await forgottenPaswordPage.continueButton.click({ force: true })

    await forgottenPaswordPage.successMessage.waitFor({
      state: 'visible',
      timeout: 5000,
    })

    await expect(forgottenPaswordPage.successMessage).toContainText(
      /email|confirmation/i,
    )
  })
})
