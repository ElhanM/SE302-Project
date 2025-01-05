import { test, expect } from '@playwright/test'
import { AskQuestionPage } from '../../page-objects/AskQuestionPage'

test.describe('Ask Question Functionality', () => {
  let askQuestionPage: AskQuestionPage

  test.beforeEach(async ({ page }) => {
    askQuestionPage = new AskQuestionPage(page)
    await askQuestionPage.visit()
  })

  test('Positive Test: Successfully send an enquiry', async ({ page }) => {
    await askQuestionPage.askQuestionButton.click({ force: true })
    await page.waitForTimeout(1000)
    await askQuestionPage.fillForm(
      'John',
      'john@fake.com',
      'Nice Phone',
      'I really like it',
    )
    await askQuestionPage.sendMessageButton.click({ force: true })
    await page.waitForTimeout(1000)
    await askQuestionPage.verifySuccessMessage(
      'Your enquiry has been successfully sent to the store owner!',
    )
  })

  test('Negative Test: Enquiry fails with empty name', async ({ page }) => {
    await askQuestionPage.askQuestionButton.click({ force: true })
    await page.waitForTimeout(1000)
    await askQuestionPage.fillForm(
      '',
      'john@fake.com',
      'Nice Phone',
      'I really like it',
    )
    await askQuestionPage.sendMessageButton.click({ force: true })
    await page.waitForTimeout(1000)
    await askQuestionPage.verifyErrorMessage(
      'Name must be between 3 and 32 characters!',
    )
  })
})
