import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'

test.describe('register account fail', () =>{
    let homePage: HomePage
    let createAccountPage: CreateAccountPage
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            createAccountPage = new CreateAccountPage(page)
            await homePage.navigateToHomePage()
        })
    
        //already exist
        test('already exists scenario', async ({page})=>{
            await createAccountPage.createAccount('hamza','susic','blablabla@hotmail.com', 'Volim1234','Volim1234')
            await createAccountPage.assertAlreadyExistsMessage()
         })

         //required field is missing test
         test('required field is missing', async ({page})=>{
            await createAccountPage.createAccount('hamza','','blablabla@hotmail.com', 'Volim1234','Volim1234')
            await createAccountPage.assertRequiredMissing()
         })

         //invalid email input test
         test('invalid email input', async ({page})=>{
            await createAccountPage.createAccount('hamza','susic','blablablahotmail.com', 'Volim1234','Volim1234')
            await createAccountPage.assertInvalidEmail()
         })
    })