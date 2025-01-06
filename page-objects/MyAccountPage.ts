import { Page, Locator, expect } from '@playwright/test'

export class MyAccountPage {
  readonly page: Page
  readonly registerLink: Locator
  readonly loginLink: Locator
  readonly forgottenPasswordLink: Locator
  readonly addressBookLink: Locator
  readonly transactionsLink: Locator
  readonly myAccountButton: Locator
  readonly wishListLink: Locator
  readonly orderHistoryLink: Locator
  readonly downloadsLink: Locator
  readonly recurringPaymentsLink: Locator
  readonly rewardPointsLink: Locator
  readonly returnsLink: Locator
  readonly newsletterLink: Locator
  readonly changePasswordLink: Locator
  readonly affiliateCreateLink: Locator

  constructor(page: Page) {
    this.page = page
    this.loginLink = page.locator('.list-group-item:nth-of-type(1)')
    this.registerLink = page.locator('.list-group-item:nth-of-type(2)')
    this.forgottenPasswordLink = page.locator('.list-group-item:nth-of-type(3)')
    this.addressBookLink = page.locator('text=Address Book')
    this.transactionsLink = page.locator('text=Transactions')
    this.myAccountButton = page.locator('text=My Account')
    this.wishListLink = page.locator('text=Wish List')
    this.orderHistoryLink = page.locator('text=Order History')
    this.downloadsLink = page.locator('text=Downloads')
    this.recurringPaymentsLink = page.locator('text=Recurring payments')
    this.rewardPointsLink = page.locator('text=Reward Points')
    this.returnsLink = page.locator('returns')
    this.newsletterLink = page.locator(
      'text= Subscribe / unsubscribe to newsletter',
    )
    this.changePasswordLink = page
      .locator('#content div')
      .filter({ hasText: 'Change your password' })
      .nth(3)
    this.affiliateCreateLink = page.locator(
      'a[href*="affiliate/add"]:has-text("Register for an affiliate account")',
    )
  }

  async visit() {
    await this.page.goto('/index.php?route=account/login')
  }
}
