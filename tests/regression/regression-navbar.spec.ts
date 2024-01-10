import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'


test.describe('NavBar', () =>{
    let homePage: HomePage
    let productListingPage: ProductListingPage
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productListingPage = new ProductListingPage(page)
            await homePage.navigateToHomePage()
        })
    
    
        test('category test men', async ({page})=>{
            await homePage.selectCategory('Men')
            await productListingPage.assertCheckCategory('Men')
         })

         test('category test women', async ({page})=>{
            await homePage.selectCategory('Women')
            await productListingPage.assertCheckCategory('Women')
         })
         test('category tes gear', async ({page})=>{
            await homePage.selectCategory('Gear')
            await productListingPage.assertCheckCategory('Gear')
         })
         test('category test training', async ({page})=>{
            await homePage.selectCategory('Training')
            await productListingPage.assertCheckCategory('Training')
         })
         test('category test sale', async ({page})=>{
            await homePage.selectCategory('Sale')
            await productListingPage.assertCheckCategory('Sale')
         })
         test('category test whats new', async ({page})=>{
            await page.getByRole('menuitem', { name: 'What\'s New' }).click()
            await productListingPage.assertCheckCategory('New')
         })
        
    })