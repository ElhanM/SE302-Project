import { test, expect } from '@playwright/test'
import { NewsLetterSubscriptionPage } from '../../page-objects/NewsLetterSubscriptionPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { MyAccountPage } from '../../page-objects/MyAccountPage'

test.describe('Newsletter Subscription', () => {
  let newsLetterSubscriptionPage: NewsLetterSubscriptionPage
  let loginPage: LoginPage
  let myAccountPage: MyAccountPage

  test.beforeEach(async ({ page }) => {
    newsLetterSubscriptionPage = new NewsLetterSubscriptionPage(page)
    loginPage = new LoginPage(page)
    myAccountPage = new MyAccountPage(page)
    await loginPage.visit()
    await loginPage.login('changePasswordTest@test.com', 'lockedinalien')
    await page.waitForLoadState('networkidle')
    await myAccountPage.newsletterLink.click({ force: true })
    await page.waitForLoadState('networkidle')
  })

  test('should subscribe to the newsletter successfully', async ({}) => {
    await newsLetterSubscriptionPage.subscribe()
    await expect(newsLetterSubscriptionPage.successMessage).toBeVisible()
  })

  test('should unsubscribe from the newsletter successfully', async ({}) => {
    await newsLetterSubscriptionPage.unsubscribe()
    await expect(newsLetterSubscriptionPage.successMessage).toBeVisible()
  })
})
