import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { AddAddressPage } from '../../page-objects/AddAddressPage'
import { AddressPage } from '../../page-objects/AddressPage'

test.describe('Address Management', () => {
  let loginPage: LoginPage
  let addAddressPage: AddAddressPage
  let addressPage: AddressPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    addAddressPage = new AddAddressPage(page)
    addressPage = new AddressPage(page)
    await loginPage.visit()
    await loginPage.login('ius-project2@test.com', 'ius-project')
    await addAddressPage.visit()
  })

  test('should add a new address successfully', async ({}) => {
    await addAddressPage.addAddress(
      'John',
      'Doe',
      'E-commerce Playground',
      'Zagrebacka 18',
      'Sarajevo',
      '71000',
      '27',
      '421',
    )
    await expect(addressPage.successMessage).toBeVisible()
  })

  test('should delete the latest address entry', async ({}) => {
    await addressPage.visit()
    await addressPage.deleteAddress()
    await expect(addressPage.successMessage).toBeVisible()
  })
})
