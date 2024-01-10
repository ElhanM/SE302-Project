import { expect } from "@playwright/test"
import { Locator, Page } from "playwright-core"
import { AbstractPage } from "./AbstractPage"

export class ProductListingPage extends AbstractPage{
    private list: string
    private items: string
    readonly itemsNum: Locator
    readonly noItems: Locator
    readonly checkSearch: Locator
    readonly itemList: Locator
    readonly category: Locator

    constructor (page: Page) {
        super(page)
        this.list = '//ol[contains(@class,"product-items")]'
        this.items = '//ol[contains(@class,"product-items")]/child::li/descendant::a[@class="product-item-link"]'
        this.itemsNum = page.locator('#toolbar-amount').first()
        this.noItems = page.locator('.message.notice')
        this.checkSearch = page.locator('.page-title').first()
        this.itemList = page.locator('.product-image-wrapper').first()
        this.category = page.locator('#page-title-heading')
    }
    

    private async countOfElements (locator) {
        return await this.page.locator(locator).count ()
    }

    public async selectItem(product) {
        const element = `//a[@title='${product}']`
            await this.page.locator (element).click ()
    }

    async checkNumberOfItems(itemsNum: string){
        await expect(this.itemsNum).toContainText(itemsNum)
    }

    async assertNoItems(){
        await expect(this.noItems).toContainText('Your search returned no results.')
    }

    async asserrtCheckSearch(check: string){
        await expect(this.checkSearch).toContainText(check)
    }

    async assertCheckCategory(category: string){
        await expect(this.category).toContainText(category)
    }

    async asaertFilter(filter: string){
        const filterLoc = `.item a:has-text("${filter}")` 
        await this.page.locator(filterLoc).click()
    }

}