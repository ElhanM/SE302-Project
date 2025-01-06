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

  test('Negative', async ({ page }) => {
    await loginPage.forgottenEmailInput.fill('test@my-example.com')

    await forgottenPaswordPage.continueButton.click({ force: true })

    await Promise.race([
      forgottenPaswordPage.errorMessage
        .waitFor({ state: 'visible' })
        .catch(() => null),
    ])

    if (await forgottenPaswordPage.errorMessage.isVisible()) {
      await expect(forgottenPaswordPage.errorMessage).toContainText(
        /Warning|The email|found/i,
      )
    } else {
      throw new Error(
        'No success or error message appeared after submitting the Forgot Password form.',
      )
    }
  })

  test('Positive', async ({ page }) => {
    await loginPage.forgottenEmailInput.fill('mustafasinanovic@outlook.com')

    await forgottenPaswordPage.continueButton.click({ force: true })

    await Promise.race([
      forgottenPaswordPage.successMessage
        .waitFor({ state: 'visible' })
        .catch(() => null),
    ])

    if (await forgottenPaswordPage.successMessage.isVisible()) {
      await expect(forgottenPaswordPage.successMessage).toContainText(
        /success|An email|confirmation/i,
      )
    } else {
      throw new Error(
        'No success or error message appeared after submitting the Forgot Password form.',
      )
    }
  })
})
