import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'


test.describe.only('Search Item Tests', () =>{
let homePage: HomePage
let productListingPage: ProductListingPage
    //before
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        productListingPage = new ProductListingPage(page)
        await homePage.navigateToHomePage()
    })
    //negative
    test('Negative Scenario', async ({page})=>{
        await homePage.searchItem('Hamza Susic')
        await productListingPage.assertNoItems()
     })

     //checking search
     test('Check Scenario', async ({page})=>{
        await homePage.searchItem('Hamza Susic')
        await productListingPage.asserrtCheckSearch('Hamza Susic')
     })

     test('Check items in search', async ({page})=>{
        await homePage.searchItem('Hero Hoodie')
        await productListingPage.checkNumberOfItems('Items 1-12 of 20')
     })




   
})