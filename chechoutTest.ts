import { test, expect } from '@playwright/test'

test.describe('Checkout Process', () => {
  test('Complete Checkout Process with Valid Details', async ({ page }) => {
    await page.goto(
      'https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=40',
    )
    await page.locator('text=Add to Cart').click()
    await page.locator('role=button[name="Cart"]').click()
    await page.locator('text=View Cart').click()
    await page.locator('text=Checkout').click()
    await page.locator('input[placeholder="First Name"]').fill('John')
    await page.locator('input[placeholder="Last Name"]').fill('Fake')
    await page
      .locator('input[placeholder="E-Mail"]')
      .fill('john.fake@example.com')
    await page.locator('input[placeholder="Telephone"]').fill('1234567890')
    await page.locator('input[placeholder="Address 1"]').fill('1234 Fake St')
    await page.locator('input[placeholder="City"]').fill('Metropolis')
    await page.locator('input[placeholder="Post Code"]').fill('12345')
    await page
      .locator('select[name="country_id"]')
      .selectOption({ label: 'US' })
    await page
      .locator('select[name="zone_id"]')
      .selectOption({ label: 'New York' })
    await page
      .locator('text=I have read and agree to the Terms & Conditions')
      .check()
    await page.locator('role=button[name="Confirm Order"]').click()
    const successMessage = page.locator(
      '.alert.alert-success.alert-dismissible',
    )
    await expect(successMessage).toBeVisible()
    await expect(successMessage).toContainText('Your order has been placed!')
  })
})
