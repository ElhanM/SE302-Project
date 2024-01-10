import test, { expect, Page } from "@playwright/test"
import * as randomString from 'random-string'
import { AbstractPage } from "./AbstractPage"


export class CheckoutPage extends AbstractPage {
    private loading: string
    private email: string
    private shippingFirstName: string
    private shippingLastName: string
    private street: string
    private city:string
    private state:string
    private zip:string
    private telephone: string
    private country: string
    private rate: string
    private continue: string
    private placeOrder: string
    private orderSuccess: string
    private missingField: string
    private invalidEmail: string
    
    constructor (page:Page){
        super(page)
        this.loading = 'img[alt*="Loading"]'
        this.email = '#customer-email-fieldset input[id="customer-email"]'
        this.shippingFirstName='div[name="shippingAddress.firstname"] input'
        this.shippingLastName='div[name="shippingAddress.lastname"] input'
        this.street = 'div[name="shippingAddress.street.0"] input'
        this.city = 'div[name="shippingAddress.city"] input'
        this.state = 'div[name="shippingAddress.region_id"] select'
        this.zip = 'div[name="shippingAddress.postcode"] input'
        this.telephone = 'div[name="shippingAddress.telephone"] input'
        this.country = 'div[name="shippingAddress.country_id"] select'
        this.rate = 'div[id="checkout-shipping-method-load"] tr:nth-of-type(2)'
        this.continue = '//button[contains(@class,"continue primary")]'
        this.placeOrder ='button[class*="primary checkout"]'
        this.orderSuccess = '//div[@class="checkout-success"]/p/span'
        this.missingField = 'field-error'
        this.invalidEmail = '#customer-email-error'
    }

    public async completeCheckoutForm (eamilId: string, firstName: string, lastName: string) {
        //expect (await this.page.locator (this.loading)).toBeVisible()
        //expect (await this.page.locator (this.email)).toBeVisible()

        await this.page.locator(this.email).fill(eamilId)
        await this.page.locator(this.shippingFirstName).fill(firstName)
        await this.page.locator(this.shippingLastName).fill(lastName)
        await this.page.locator(this.street).fill('#8077 Automation Test')
        await this.page.locator(this.city).fill('Miami')
        await this.page.locator(this.state).selectOption({label: 'Florida'})
        await this.page.locator(this.zip).fill('32819')
        await this.page.locator(this.telephone).fill('1234567899')
        await this.page.locator(this.rate).click()
        await this.page.locator(this.continue).click()
        
    }

    public async placeOrderAndRetreiveOrderNumber () {
        await this.page.waitForSelector(this.placeOrder)
        await this.page.locator (this.placeOrder).click()
        expect (this.page.locator (this.orderSuccess)).toBeVisible()
        console.log (`Order is placed successfully and order number is ${await this.page.locator (this.orderSuccess).innerText()}`)

    }

    public async assertMissingField(){
        await expect(this.page.locator(this.missingField).first()).toContainText('This is a required field.')
    }

    public async assertInvalidEmail(){
        await expect(this.page.locator(this.invalidEmail).first()).toContainText('Please enter a valid email address (Ex: johndoe@domain.com).')
    }
}