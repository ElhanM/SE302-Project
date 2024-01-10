import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'

test.describe('Login/Logout Flow', () =>{
    let homePage: HomePage
    let createAccountPage: CreateAccountPage
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            createAccountPage = new CreateAccountPage(page)
            await homePage.navigateToHomePage()
        })
    
        //positive
        test('positive scenario', async ({page})=>{
           await createAccountPage.createAccount('hamza','susic','asblablabla@hotmail.com', 'Volim1234','Volim1234')
           await createAccountPage.assertSuccesMessage()
        })

    })