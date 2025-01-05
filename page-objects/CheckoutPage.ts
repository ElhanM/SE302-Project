import { Locator, Page } from '@playwright/test'

interface GuestCheckoutDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  address1: string
  address2?: string
  city: string
  postcode: string
  countryValue: string
  stateValue: string
}

export class CheckoutPage {
  readonly page: Page
  readonly quantityInput: Locator
  firstName: Locator
  lastName: Locator
  email: Locator
  telephone: Locator
  company: Locator
  address1: Locator
  address2: Locator
  city: Locator
  postcode: Locator
  country: Locator
  zone: Locator
  inputAccountGuest: Locator
  inputAgree: Locator
  saveButton: Locator
  confirmButton: Locator
  confirmationMessage: Locator
  errorMessages: Locator

  constructor(page: Page) {
    this.page = page
    this.quantityInput = page.locator('#content td input')
    this.firstName = this.page.locator('#input-payment-firstname')
    this.lastName = this.page.locator('#input-payment-lastname')
    this.email = this.page.locator('#input-payment-email')
    this.telephone = this.page.locator('#input-payment-telephone')
    this.company = this.page.locator('#input-payment-company')
    this.address1 = this.page.locator('#input-payment-address-1')
    this.address2 = this.page.locator('#input-payment-address-2')
    this.city = this.page.locator('#input-payment-city')
    this.postcode = this.page.locator('#input-payment-postcode')
    this.country = this.page.locator('#input-payment-country')
    this.zone = this.page.locator('#input-payment-zone')
    this.inputAccountGuest = this.page.locator('#input-account-guest')
    this.inputAgree = this.page.locator('#input-agree')
    this.saveButton = this.page.locator('#button-save')
    this.confirmButton = this.page.locator('#button-confirm')
    this.confirmationMessage = this.page.locator('.page-title')
    this.errorMessages = this.page.locator('.invalid-feedback')
  }

  async visit() {
    await this.page.goto('/index.php?route=checkout/cart')
  }

  // CheckoutPage.ts
  async fillGuestCheckoutDetails(details: GuestCheckoutDetails) {
    await this.firstName.fill(details.firstName)
    await this.lastName.fill(details.lastName)
    await this.email.fill(details.email)
    await this.telephone.fill(details.phone)
    await this.company.fill(details.company || '')
    await this.address1.fill(details.address1)
    await this.address2.fill(details.address2 || '')
    await this.city.fill(details.city)
    await this.postcode.fill(details.postcode)
    await this.country.selectOption(details.countryValue)
    await this.zone.selectOption(details.stateValue)
  }
}
