import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'


test.describe('Search Item', () =>{
let homePage: HomePage
let loginPage: LoginPage
let productListingPage: ProductListingPage
    //before
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        productListingPage = new ProductListingPage(page)
        await homePage.navigateToHomePage()
    })

    //positive
    test('Positive Scenario', async ({page})=>{
       await homePage.searchItem('Hero Hoodie')
       await productListingPage.checkNumberOfItems('Items 1-12 of 20')
    })

   
})