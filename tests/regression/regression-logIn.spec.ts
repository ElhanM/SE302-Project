import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login Regression', () =>{
let homePage: HomePage
let loginPage: LoginPage
    //before
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.navigateToHomePage()
    })

    //negative
    test('negative scenario', async ({page})=>{
       await loginPage.signIn('hamzasusic@hameil.com','pass')
       await loginPage.assertErrorMessage()
    })
    //negative missing field
    test('missing field', async ({page})=>{
        await loginPage.signIn('hamzasusic@example2.com','')
        await loginPage.assertMissingField()
    })
    //negative invalid data
    test('invalid data', async ({page})=>{
        await loginPage.signIn('hamzasusicexample2.com','pass')
        await loginPage.assertInvalidData()
    })

})