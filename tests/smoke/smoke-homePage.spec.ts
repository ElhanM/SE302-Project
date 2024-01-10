import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'


test.describe('Home Page Succes', () =>{
let homePage: HomePage

    //before
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        await homePage.navigateToHomePage()
    })

    //check does the homepage load corectlly
    test('Checking Home Page Features', async ({page})=>{
       await homePage.checkHomePage()
    })

   
})