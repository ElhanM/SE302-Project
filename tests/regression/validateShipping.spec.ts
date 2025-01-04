import { test, expect } from '@playwright/test'
import { CategoryPage } from '../../page-objects/CategoryPage'
import { CheckoutPage } from '../../page-objects/CheckoutPage'
import { ProductDetailsPage } from '../../page-objects/ProductDetailsPage'

test.describe('Shipping Funcionality', () => {
  let categoryPage: CategoryPage
  let checkoutPage: CheckoutPage
  let productDetailsPage: ProductDetailsPage

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page)
    checkoutPage = new CheckoutPage(page)
    productDetailsPage = new ProductDetailsPage(page)

    // Navigate to the desired category
    await categoryPage.navigateToLaptopsAndNotebooks()
    await page.waitForLoadState('networkidle')

    // Select and open the first product
    const firstProduct = categoryPage.products.first()
    const firstProductTitle = await categoryPage.getProductTitle(firstProduct)
    await expect(firstProductTitle).toBeVisible()
    await firstProductTitle.click({ force: true })

    await page.waitForLoadState('networkidle')

    // Add product to cart
    const addToCartButton = productDetailsPage.addToCartButton
    await expect(addToCartButton).toBeVisible()
    await addToCartButton.click({ force: true })

    await page.waitForTimeout(2000)

    const viewCartButton = productDetailsPage.viewCartButton
    await expect(viewCartButton).toBeVisible()
    await viewCartButton.click({ force: true })

    await page.waitForLoadState('networkidle')

    await expect(checkoutPage.quantityInput).toBeVisible()
    await expect(checkoutPage.quantityInput).toHaveValue('1')

    const checkoutButton = page.locator(
      'a.btn.btn-lg.btn-primary[href="https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout"]',
    )
    await expect(checkoutButton).toBeVisible()
    await checkoutButton.click({ force: true })

    await page.waitForLoadState('networkidle')

    await page.locator('#input-account-guest').click({ force: true })
  })

  test('All input fields - Positive', async ({ page }) => {
    await checkoutPage.fillGuestCheckoutDetails({
      firstName: 'Mustafa',
      lastName: 'Sinanovic',
      email: 'mustafasinanovic@outlook.com',
      phone: '+38763398292',
      company: 'DHL',
      address1: 'Dzemala Bijedica 123',
      address2: 'Hrasnicka Cesta 123',
      city: 'Sarajevo',
      postcode: '71000',
      countryValue: '27',
      stateValue: '421',
    })

    await page.locator('#input-agree').click({ force: true })

    await page.waitForTimeout(2000)

    const saveButton = page.locator('#button-save')
    await saveButton.click({ force: true })

    await page.waitForTimeout(2000)

    const confirmButton = page.locator('#button-confirm')
    await confirmButton.click()

    await page.waitForLoadState('networkidle')

    const confirmationMessage = page.locator('.page-title')
    await expect(confirmationMessage).toBeVisible()
    await expect(confirmationMessage).toHaveText('Your order has been placed!')
  })

  test('Invalid address field - Negative', async ({ page }) => {
    // Enter invalid checkout details
    await checkoutPage.fillGuestCheckoutDetails({
      firstName: '',
      lastName: 'Sinanovic',
      email: 'invalidemail',
      phone: '123',
      company: '',
      address1: 'Invalid Address',
      address2: '',
      city: 'Sarajevo',
      postcode: 'invalid', // Invalid postcode
      countryValue: '27',
      stateValue: '421',
    })

    await page.locator('#input-agree').click({ force: true })

    await page.waitForTimeout(2000)

    const saveButton = page.locator('#button-save')
    await saveButton.click({ force: true })

    await page.waitForTimeout(2000)

    // Check for other invalid feedback messages
    const errorMessages = page.locator('.invalid-feedback')
    const errorMessagesCount = await errorMessages.count()
    for (let i = 0; i < errorMessagesCount; i++) {
      const errorMessage = await errorMessages.nth(i).textContent()
      if (i === 0) {
        expect(
          errorMessage === 'First Name must be between 1 and 32 characters!',
        )
      } else if (i === 1) {
        expect(errorMessage === 'E-Mail address does not appear to be valid!')
      } else if (i === 2) {
        expect(errorMessage === 'Password must be between 4 and 20 characters!')
      }
    }
  })
})
