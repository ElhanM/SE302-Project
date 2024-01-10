import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'

test.describe('Footer tests', () =>{
    let homePage: HomePage
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            await homePage.navigateToHomePage()
        })

        test('acces returns', async ({page})=>{
            await homePage.assertReturns()
         })

         test('acces advanced search', async ({page})=>{
            await homePage.assertAdvancedSearch()
         })

         test('acces Privacy Policy', async ({page})=>{
            await homePage.assertPrivacyPolicy()
         })

         test('acces search terms', async ({page})=>{
            await homePage.assertSearchTerms()
         })
    })