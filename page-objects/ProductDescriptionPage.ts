import { expect, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"

export class ProductDescriptionPage extends AbstractPage{
    private productTitle: string
    private size: string
    private color: string
    private addToCart: string
    private myCart: string

    constructor (page: Page) {
        super(page)
        this.productTitle = 'h1.page-title span'
        this.size = 'div[id*="option-label-size"]'
        this.color = 'div[id*="option-label-color"]'
        this.addToCart = '#product-addtocart-button'
        this.myCart = '//a[text()="shopping cart"]'
    } 

    private async countOfElements (locator) {
        return await this.page.locator(locator).count ()
    }

    private async selectRandom (limit) {
        return Math.floor ((Math.random () * Number (limit))+1)
    }

    public async verifyProductDescriptionPage () {
        await expect (this.page.locator(this.productTitle)).toBeVisible ()
    }

    public async selectAnySize () {

        let sizeElements = await this.countOfElements (`${this.size}`)
        let choice = await this.selectRandom (`${sizeElements}`)
        let sizeChosen =`${this.size}:nth-of-type(${choice})`
        
        console.log (`Size : ${await this.page.locator (sizeChosen).innerText ()}`)
        await this.page.locator (sizeChosen).click ()
    }

    public async selectAnyColor () {

        let colorElements = await this.countOfElements (`${this.color}`)
        let choice = await this.selectRandom (`${colorElements}`)
        let colorChosen =`${this.color}:nth-of-type(${choice})`
        
        console.log (`Color : ${await this.page.locator (colorChosen).getAttribute ('option-label')}`);
        await this.page.locator (colorChosen).click ()
    }

    public async addProductToCart () {
      await this.page.locator (this.addToCart).click ()
    //   let cartPage = await this.page.locator (this.myCart).getAttribute ('href');
      await this.page.locator (this.myCart).click ()
    }
}