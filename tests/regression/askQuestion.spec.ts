import { test, expect } from '@playwright/test'
import { AskQuestionPage } from '../../page-objects/AskQuestionPage'

test.describe('Ask Question Functionality', () => {
  let askQuestionPage: AskQuestionPage

  test.beforeEach(async ({ page, baseURL }) => {
    askQuestionPage = new AskQuestionPage(page)
    await page.goto(
      `${baseURL}/index.php?route=product/product&path=57&product_id=28`,
    )
  })

  test('Positive Test: Successfully send an enquiry', async () => {
    await askQuestionPage.askQuestionButton.click()
    await askQuestionPage.fillForm(
      'John',
      'john@fake.com',
      'Nice Phone',
      'I really like it',
    )
    await askQuestionPage.sendMessageButton.click()
    await askQuestionPage.verifySuccessMessage(
      'Your enquiry has been successfully sent to the store owner!',
    )
  })

  test('Negative Test: Enquiry fails with empty name', async () => {
    await askQuestionPage.askQuestionButton.click()
    await askQuestionPage.fillForm(
      '',
      'john@fake.com',
      'Nice Phone',
      'I really like it',
    )
    await askQuestionPage.sendMessageButton.click()
    await askQuestionPage.verifyErrorMessage(
      'Name must be between 3 and 32 characters!',
    )
  })
})
