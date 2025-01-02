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
    this.newsletterLink = page.locator('text=Newsletter')
  }

  async visit() {
    await this.page.goto('/index.php?route=account/login')
  }

  async clickRegister() {
    await this.registerLink.click()
  }

  async clickLogin() {
    await this.loginLink.click()
  }

  async clickForgottenPassword() {
    await this.forgottenPasswordLink.click()
  }

  async clickAddressBook() {
    await this.addressBookLink.click()
  }

  async clickTransactions() {
    await this.transactionsLink.click()
  }

  async clickMyAccount() {
    await this.myAccountButton.click()
  }

  async clickWishList() {
    await this.wishListLink.click()
  }

  async clickOrderHistory() {
    await this.orderHistoryLink.click()
  }

  async clickDownloads() {
    await this.downloadsLink.click()
  }

  async clickRecurringPayments() {
    await this.recurringPaymentsLink.click()
  }

  async clickRewardPoints() {
    await this.rewardPointsLink.click()
  }

  async clickReturns() {
    await this.returnsLink.click()
  }

  async clickNewsletter() {
    await this.newsletterLink.click()
  }

  async assertOnRegisterPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/register`,
    )
  }

  async assertOnLoginPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/login`,
    )
  }

  async assertOnForgottenPasswordPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/forgotten`,
    )
  }

  async assertOnAddressBookPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/address`,
    )
  }

  async assertOnTransactionsPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/transaction`,
    )
  }

  async assertOnWishListPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/wishlist`,
    )
  }

  async assertOnOrderHistoryPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/order`,
    )
  }

  async assertOnDownloadsPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/download`,
    )
  }

  async assertOnRecurringPaymentsPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/recurring`,
    )
  }

  async assertOnRewardPointsPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/reward`,
    )
  }

  async assertOnReturnsPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/return`,
    )
  }

  async assertOnNewsletterPage(baseURL: string) {
    await expect(this.page).toHaveURL(
      `${baseURL}/index.php?route=account/newsletter`,
    )
  }
}
