import { HomePage } from "../../page-objects/HomePage";
import { ProductListingPage } from "../../page-objects/ProductListingPage";
import { ProductDescriptionPage } from "../../page-objects/ProductDescriptionPage";
import {test, expect} from "@playwright/test";
import { CartPage } from "../../page-objects/CartPage";
import { CheckoutPage } from "../../page-objects/CheckoutPage";

test.describe('Checkout Path', () =>{
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
        })
    
        //check does the homepage load corectlly
        test('checkout', async ({page})=>{
           await homePage.selectCategory('Men')
           await productListingPage.selectItem('Hero Hoodie') //click on hero hoodie
           await productDescriptionPage.verifyProductDescriptionPage()
           await productDescriptionPage.selectAnySize()
           await productDescriptionPage.selectAnyColor()
           await productDescriptionPage.addProductToCart()
           await cartPage.checkOutCart()
           await checkoutPage.completeCheckoutForm('hsusic@hotmail.com', 'hamza', 'suhi')
           await checkoutPage.placeOrderAndRetreiveOrderNumber()
        })
    
       
    })