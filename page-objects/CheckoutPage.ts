import { Locator, Page } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page
  readonly quantityInput: Locator

  constructor(page: Page) {
    this.page = page
    this.quantityInput = page.locator('#content td input')
  }

  async visit() {
    await this.page.goto('/index.php?route=checkout/cart')
  }

  // CheckoutPage.ts
async fillGuestCheckoutDetails(details: {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  company: string,
  address1: string,
  address2: string,
  city: string,
  postcode: string,
  countryValue: string,
  stateValue: string,
}) {
  await this.page.locator('#input-payment-firstname').fill(details.firstName);
  await this.page.locator('#input-payment-lastname').fill(details.lastName);
  await this.page.locator('#input-payment-email').fill(details.email);
  await this.page.locator('#input-payment-telephone').fill(details.phone);
  await this.page.locator('#input-payment-company').fill(details.company);
  await this.page.locator('#input-payment-address-1').fill(details.address1);
  await this.page.locator('#input-payment-address-2').fill(details.address2);
  await this.page.locator('#input-payment-city').fill(details.city);
  await this.page.locator('#input-payment-postcode').fill(details.postcode);
  await this.page.selectOption('#input-payment-country', { value: details.countryValue });
  await this.page.selectOption('#input-payment-zone', { value: details.stateValue });

}

}
