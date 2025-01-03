import { test, expect } from '@playwright/test'

test.describe('Ask Question Functionality', () => {
  test('Positive Test: Successfully send an enquiry', async ({
    page,
    baseURL,
  }) => {
    await page.goto(
      `${baseURL}/index.php?route=product/product&path=57&product_id=28`,
    )
    await page.getByLabel('Ask Question').click()

    await page.getByPlaceholder('Your name', { exact: true }).fill('John')
    await page.getByPlaceholder('Your email').fill('john@fake.com')
    await page.getByPlaceholder('Subject').fill('Nice Phone')
    await page.getByPlaceholder('Message').fill('I really like it')

    await page.getByRole('button', { name: 'Send message' }).click()

    const successMessage = page.locator(
      '.alert.alert-success.alert-notification',
    )
    await expect(successMessage).toBeVisible()
    await expect(successMessage).toContainText(
      'Your enquiry has been successfully sent to the store owner!',
    )
  })

  test('Negative Test: Enquiry fails with empty name', async ({ page }) => {
    await page.goto(
      'https://ecommerce-playground.lambdatest.io/index.php?route=product/product&path=57&product_id=28',
    )

    await page.getByLabel('Ask Question').click()

    await page.getByPlaceholder('Your email').fill('john@fake.com')
    await page.getByPlaceholder('Subject').fill('Nice Phone')
    await page.getByPlaceholder('Message').fill('I really like it')

    await page.getByRole('button', { name: 'Send message' }).click()

    const errorMessage = page.locator('.error.text-danger')
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toHaveText(
      'Name must be between 3 and 32 characters!',
    )
  })
})
