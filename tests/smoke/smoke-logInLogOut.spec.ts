import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login/Logout Flow', () =>{
let homePage: HomePage
let loginPage: LoginPage
    //before
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.navigateToHomePage()
    })

    test('succes scenario and logout', async ({page})=>{
        await loginPage.signIn('hamzasusic@example2.com','Hamza1234')
        await loginPage.assertSuccesMessage()  
        await loginPage.logOut()
        await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/logoutSuccess/')
    })
})