import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'
import { OrdersAndReturns } from '../../page-objects/OrdersAndReturnsPage'

test.describe('orders and returs', () =>{
    let homePage: HomePage
    let ordersAndReturns: OrdersAndReturns 
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            ordersAndReturns = new OrdersAndReturns(page)
            await homePage.navigateToHomePage()
        })
    

        test('check returns by email', async ({page})=>{
            await homePage.assertReturns()
            await ordersAndReturns.failedReturnSearchEmail('182738', 'Susic', 'hamza@example.com')
         })


        test('check returns by zip', async ({page})=>{
            await homePage.assertReturns()
            await ordersAndReturns.failedReturnSearchZip('182738', 'Susic', '12345')
         })

        // 000040529 Order ID for success

         test('check returns by email succes', async ({page})=>{
            await homePage.assertReturns()
            await ordersAndReturns.successReturnSearchZip('000040529', 'Susic', 'hamza@example.com')
         })

        
         test('check returns by zip succes', async ({page})=>{
            await homePage.assertReturns()
            await ordersAndReturns.successReturnSearchEmail('000040529', 'Susic', '71240')
         })


    })