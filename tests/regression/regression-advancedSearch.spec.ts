import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'
import { OrdersAndReturns } from '../../page-objects/OrdersAndReturnsPage'
import { AdvancedSearch } from '../../page-objects/AdvancedSearch'

test.describe('Advanced Search', () =>{
    let homePage: HomePage
    let advancedSearch: AdvancedSearch
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            advancedSearch = new AdvancedSearch(page)
            await homePage.navigateToHomePage()
        })
    

        test('check search succes', async ({page})=>{
            await homePage.assertAdvancedSearch()
            await advancedSearch.Search('Argus All-Weather Tank', 'MT07', '','','20','30')
            await advancedSearch.assertSucces()
        })

        test('check seach fail', async ({page})=>{
            await homePage.assertAdvancedSearch()
            await advancedSearch.Search('Hamza', 'MT44', 'bla bla bla','','20','30')
            await advancedSearch.assertSucces()
        })



    })