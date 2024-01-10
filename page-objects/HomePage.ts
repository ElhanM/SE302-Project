import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage{
    readonly menu: Locator
    readonly url: string
    readonly searchInput: Locator
    readonly panelHeader: Locator
    readonly header: Locator
    readonly navBar: Locator
    readonly promo: Locator
    readonly mainContent: Locator
    readonly product: Locator
    readonly footer: Locator
    readonly footerReturns: Locator
    readonly footerAdvancedSearch: Locator
    readonly footerPrivacy: Locator
    readonly footerSearchTerms: Locator
    readonly yogaBanner: Locator
    readonly percentOffBanner: Locator
    readonly mixMatch: Locator
    readonly reccomendationBanner: Locator
    readonly ecoFriendlyBanner: Locator
    readonly performanceBanner: Locator



    constructor(page: Page) {
        super(page)
        this.menu = page.locator('div[id="store.menu"]')
        this.url = 'https://magento.softwaretestingboard.com'
        this.searchInput = page.locator('#search.input-text')
        this.panelHeader = page.locator('.panel.header')
        this.header = page.locator('.header.content')
        this.navBar = page.locator('.sections.nav-sections')
        this.mainContent = page.locator('#maincontent')
        this.product = page.locator('.product-item-info').first()
        this.footer = page.locator('.page-footer')
        this.promo = page.locator('.blocks-promo')
        this.footerReturns = page.locator('text=Orders and Returns')
        this.footerAdvancedSearch = page.getByRole('link', { name: 'Advanced Search' })
        this.footerPrivacy = page.getByRole('link', { name: 'Privacy and Cookie Policy' })              
        this.footerSearchTerms = page.getByRole('link', { name: 'Search Terms' })  
        this.yogaBanner = page.getByRole('link', { name: 'New Luma Yoga Collection Get' })
        this.percentOffBanner = page.getByRole('link', { name: '20% OFF Luma pants when you' })
        this.mixMatch = page.getByRole('link', { name: 'Even more ways to mix and' })
        this.reccomendationBanner = page.getByRole('link', { name: 'Take it from Erin Luma' })
        this.ecoFriendlyBanner = page.getByRole('link', { name: 'Twice around, twice as nice' })
        this.performanceBanner = page.getByRole('link', { name: 'Science meets performance' }) 
    }

    public async selectCategory (item) {

        const element = `(//span[text()="${item}"]/parent::a)[1]`
            await this.page.locator (element).click ()
            console.log (`Clicked ${element}`)
    }


    public async navigateToHomePage() {
        await this.page.goto(this.url)
    }

    async searchItem(search: string){
        await this.searchInput.type(search)
        await this.page.keyboard.press('Enter')
    }

    async checkHomePage(){
        await expect(this.panelHeader).toContainText('Click “Write for us” link in the footer to submit a guest post Sign In  Create an Account')
        await expect(this.header).toBeVisible()
        await expect(this.navBar).toBeVisible()
        await expect(this.mainContent).toBeVisible()
        await expect(this.promo).toBeVisible()
        await expect(this.product).toBeVisible()
        await expect(this.footer).toBeVisible()
    }

    async assertReturns(){
        await this.footerReturns.click()
        const currentUrl = this.page.url()
        expect(currentUrl).toEqual('https://magento.softwaretestingboard.com/sales/guest/form/')
    }

    async assertAdvancedSearch(){
        await this.footerAdvancedSearch.click()
        const currentUrl = this.page.url()
        expect(currentUrl).toEqual('https://magento.softwaretestingboard.com/catalogsearch/advanced/')
    }

    async assertPrivacyPolicy(){
        await this.footerPrivacy.click()
        const currentUrl = this.page.url()
        expect(currentUrl).toEqual('https://magento.softwaretestingboard.com/privacy-policy-cookie-restriction-mode')
    }


    async assertSearchTerms(){
        await this.footerSearchTerms.click()
        const currentUrl = this.page.url()
        expect(currentUrl).toEqual('https://magento.softwaretestingboard.com/search/term/popular/')
    }

}