import test, { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"


export class AdvancedSearch extends AbstractPage {
    readonly loading: Locator
    readonly productName: Locator
    readonly SKU: Locator
    readonly description: Locator
    readonly shortDescription: Locator
    readonly priceMin: Locator
    readonly priceMax: Locator
    readonly searchButton: Locator
    readonly failedSearch: Locator
    readonly succesSearch: Locator

    
    constructor (page:Page){
        super(page)
        this.loading = page.locator('img[alt*="Loading"]')
        this.productName = page.getByLabel('Product Name')
        this.SKU = page.getByLabel('SKU')
        this.description = page.getByLabel('Description', { exact: true })
        this.shortDescription = page.getByLabel('Short Description')
        this.priceMin = page.getByLabel('Price')
        this.priceMax = page.getByLabel('USD')
        this.searchButton = page.locator('#form-validate').getByRole('button', { name: 'Search' })
        this.failedSearch = page.locator('.message.error')
        this.succesSearch = page.locator('.search.found')
    }

    async Search (productName: string, sku: string, description: string, shortDescription: string, min: string, max: string) {
        // expect (await this.page.locator (this.loading)).toBeVisible()
        await this.productName.fill(productName)
        await this.SKU.fill(sku)
        await this.description.fill(description)
        await this.shortDescription.fill(shortDescription)
        await this.priceMin.fill(min)
        await this.priceMax.fill(max)
        await this.searchButton.click()
    }

    async assertSucces(){
        expect (this.succesSearch).toBeVisible()
    }

    async assertFail(){
        expect (this.failedSearch).toBeVisible()
    }

}