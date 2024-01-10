import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'

test.describe('Featured product tests', () =>{
    let homePage: HomePage
    let productListingPage: ProductListingPage
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productListingPage = new ProductListingPage(page)
            await homePage.navigateToHomePage()
        })

        test('yoga banner test', async ({page})=>{
            await homePage.yogaBanner.click()
            await productListingPage.assertCheckCategory('New Luma Yoga Collection')

         })

         test('20% off banner test', async ({page})=>{
            await homePage.percentOffBanner.click()
            await productListingPage.assertCheckCategory('Pants')

         })

         test('recomendation banner test', async ({page})=>{
            await homePage.reccomendationBanner.click()
            await productListingPage.assertCheckCategory('Erin Recommends')

         })

         test('mix-match banner test', async ({page})=>{
            await homePage.mixMatch.click()
            await productListingPage.assertCheckCategory('Tees')

         })

         test('performance banner test', async ({page})=>{
            await homePage.performanceBanner.click()
            await productListingPage.assertCheckCategory('Performance Fabrics')

         })

         test('ecofriendly banner test', async ({page})=>{
            await homePage.ecoFriendlyBanner.click()
            await productListingPage.assertCheckCategory('Eco Friendly')

         })

    })