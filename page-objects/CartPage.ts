import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CartPage extends AbstractPage {
    readonly page : Page;
    readonly proceedToCheckOut : Locator
    readonly cartTotal: Locator
    readonly cartUrl: string

    constructor (page:Page) {
        super(page)
        this.cartTotal = page.locator('div[id="cart-totals"]')
        this.proceedToCheckOut = page.locator('div[class="cart-summary"] button[title="Proceed to Checkout"]')
        this.cartUrl = 'https://magento.softwaretestingboard.com/checkout/cart/'
    }

    public async checkOutCart () {
        await expect (this.cartTotal).toBeVisible()
        await expect (this.proceedToCheckOut).toBeVisible()
        await this.proceedToCheckOut.click()
    }
    
}