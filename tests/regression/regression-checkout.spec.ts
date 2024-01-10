import { HomePage } from "../../page-objects/HomePage";
import { ProductListingPage } from "../../page-objects/ProductListingPage";
import { ProductDescriptionPage } from "../../page-objects/ProductDescriptionPage";
import {test, expect} from "@playwright/test";
import { CartPage } from "../../page-objects/CartPage";
import { CheckoutPage } from "../../page-objects/CheckoutPage";

test.describe('Checkout Failed', () =>{
    let homePage: HomePage
    let productListingPage: ProductListingPage
    let productDescriptionPage: ProductDescriptionPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
        //before
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productListingPage = new ProductListingPage(page)
            productDescriptionPage = new ProductDescriptionPage(page)
            cartPage = new CartPage(page)
            checkoutPage = new CheckoutPage(page)
            await homePage.navigateToHomePage()
            await homePage.selectCategory('Men')
            await productListingPage.selectItem('Hero Hoodie')
            await productDescriptionPage.verifyProductDescriptionPage()
            await productDescriptionPage.selectAnySize()
            await productDescriptionPage.selectAnyColor()
            await productDescriptionPage.addProductToCart()
            await cartPage.checkOutCart()

        })
    
        test('checkout missing field', async ({page})=>{
           await checkoutPage.completeCheckoutForm('hsusic@hotmail.com', '', 'suhi')
           await checkoutPage.assertMissingField()
        })

        test('invalid data test', async ({page})=>{
            await checkoutPage.completeCheckoutForm('hsusicsdhsdhsm', 'hamza', 'suhi')
            await checkoutPage.assertInvalidEmail()
         })

         
       
    })