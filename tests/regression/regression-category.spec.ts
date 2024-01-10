import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'


test.describe('Categories Field Test', () =>{
    let homePage: HomePage
    let productListingPage: ProductListingPage
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productListingPage = new ProductListingPage(page)
            await homePage.navigateToHomePage()
        })
    

        
         test('sub category filter test', async ({page})=>{
            await homePage.selectCategory('Men')
            await productListingPage.asaertFilter('Hoodies & Sweatshirts')
            await productListingPage.assertCheckCategory('Hoodies & Sweatshirts')
            await page.getByRole('tab', { name: 'Material ' }).click()
            await page.getByRole('link', { name: 'Fleece (5 item )' }).click()
            await productListingPage.checkNumberOfItems('5 Items')
            
         })

    })