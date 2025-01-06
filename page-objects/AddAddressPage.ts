import { Page, Locator, expect } from '@playwright/test'

export class AddAddressPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly companyInput: Locator
  readonly address1Input: Locator
  readonly cityInput: Locator
  readonly postCodeInput: Locator
  readonly countrySelect: Locator
  readonly regionSelect: Locator
  readonly defaultAddressRadio: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameInput = page.getByPlaceholder('First Name')
    this.lastNameInput = page.getByPlaceholder('Last Name')
    this.companyInput = page.getByPlaceholder('Company')
    this.address1Input = page.getByPlaceholder('Address 1')
    this.cityInput = page.getByPlaceholder('City')
    this.postCodeInput = page.getByPlaceholder('Post Code')
    this.countrySelect = page.getByLabel('Country')
    this.regionSelect = page.getByLabel('Region / State')
    this.defaultAddressRadio = page.getByText('No', { exact: true })
    this.continueButton = page.getByRole('button', { name: 'Continue' })
  }

  async visit() {
    await this.page.goto('/index.php?route=account/address/add')
    await this.page.waitForLoadState('networkidle')
  }

  async addAddress(
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    city: string,
    postCode: string,
    country: string,
    region: string,
  ) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.companyInput.fill(company)
    await this.address1Input.fill(address1)
    await this.cityInput.fill(city)
    await this.postCodeInput.fill(postCode)
    await this.countrySelect.selectOption(country)
    await this.regionSelect.selectOption(region)
    await this.defaultAddressRadio.click({ force: true })
    await this.continueButton.click({ force: true })
  }
}
