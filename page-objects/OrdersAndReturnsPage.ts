import test, { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"


export class OrdersAndReturns extends AbstractPage {
    readonly loading: Locator
    readonly orderId: Locator
    readonly billingLastName: Locator
    readonly findOrderBy: Locator
    readonly email: Locator
    readonly zip: Locator
    readonly continueButton: Locator
    readonly noOrderBanner: Locator
    readonly orderTable: Locator

    
    constructor (page:Page){
        super(page)
        this.loading = page.locator('img[alt*="Loading"]')
        this.orderId = page.getByLabel('Order ID')
        this.billingLastName = page.getByLabel('Billing Last Name')
        this.findOrderBy = page.getByLabel('Find Order By')
        this.email = page.getByLabel('Email', { exact: true })
        this.zip = page.getByLabel('Billing ZIP Code')
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.noOrderBanner = page.getByText('You entered incorrect data.')
        this.orderTable = page.locator('#my-orders-table.data.table-order-items')
    }

    public async failedReturnSearchEmail (orderId: string, billingLastName: string, email: string) {
        // expect (await this.page.locator (this.loading)).toBeVisible()
        await this.orderId.fill(orderId)
        await this.billingLastName.fill(billingLastName)
        await this.findOrderBy.selectOption({label: 'Email'})
        await this.email.fill(email)
        await this.continueButton.click()
        expect (this.noOrderBanner).toBeVisible()
    }

    public async failedReturnSearchZip (orderId: string, billingLastName: string, zip: string) {
        // expect (await this.page.locator (this.loading)).toBeVisible()
        await this.orderId.fill(orderId)
        await this.billingLastName.fill(billingLastName)
        await this.findOrderBy.selectOption({label: 'ZIP Code'})
        await this.zip.fill(zip)
        await this.continueButton.click()
        expect (this.noOrderBanner).toBeVisible()
    }

    public async successReturnSearchEmail(orderId: string, billingLastName: string, email: string){
        await this.orderId.fill(orderId)
        await this.billingLastName.fill(billingLastName)
        await this.findOrderBy.selectOption({label: 'Email'})
        await this.email.fill(email)
        await this.continueButton.click()
        expect (this.orderTable).toBeVisible()
    }

    public async successReturnSearchZip (orderId: string, billingLastName: string, zip: string) {
        // expect (await this.page.locator (this.loading)).toBeVisible()
        await this.orderId.fill(orderId)
        await this.billingLastName.fill(billingLastName)
        await this.findOrderBy.selectOption({label: 'ZIP Code'})
        await this.zip.fill(zip)
        await this.continueButton.click()
        expect (this.orderTable).toBeVisible()
    }

    



}