import { test, expect } from '@playwright/test';
import { CategoryPage } from '../../page-objects/CategoryPage';
import { CheckoutPage } from '../../page-objects/CheckoutPage';
import { ProductDetailsPage } from '../../page-objects/ProductDetailsPage';

test.describe('Add to cart', () => {
    let categoryPage: CategoryPage;
    let checkoutPage: CheckoutPage;
    let productDetailsPage: ProductDetailsPage;

    test.beforeEach(async ({ page }) => {
        categoryPage = new CategoryPage(page);
        checkoutPage = new CheckoutPage(page);
        productDetailsPage = new ProductDetailsPage(page);

        // Navigate to the desired category
        await categoryPage.navigateToLaptopsAndNotebooks();
    });

    test('Validate shipping functionality', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        // Select and open the first product
        const firstProduct = categoryPage.products.first();
        const firstProductTitle = await categoryPage.getProductTitle(firstProduct);
        await expect(firstProductTitle).toBeVisible();
        await firstProductTitle.click({ force: true });

        await page.waitForLoadState('networkidle');

        // Add product to cart
        const addToCartButton = productDetailsPage.addToCartButton;
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click({ force: true });

        await page.waitForTimeout(2000);

        const viewCartButton = productDetailsPage.viewCartButton;
        await expect(viewCartButton).toBeVisible();
        await viewCartButton.click({ force: true });

        await page.waitForLoadState('networkidle');

        await expect(checkoutPage.quantityInput).toBeVisible();
        await expect(checkoutPage.quantityInput).toHaveValue('1');

        const checkoutButton = page.locator(
            'a.btn.btn-lg.btn-primary[href="https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout"]'
        );
        await expect(checkoutButton).toBeVisible();
        await checkoutButton.click({ force: true });

        await page.waitForLoadState('networkidle');

        await page.locator('#input-account-guest').click({ force: true });

        await checkoutPage.fillGuestCheckoutDetails({
            firstName: 'Mustafa',
            lastName: 'Sinanovic',
            email: 'mustafasinanovic@outlook.com',
            phone: '+38763398292',
            company: 'DHL',
            address1: 'Dzemala Bijedica 123',
            address2: 'Hrasnicka Cesta 123',
            city: 'Sarajevo',
            postcode: '71000',
            countryValue: '27',
            stateValue: '421',
        });

        await page.locator("#input-agree").click({ force: true });

        await page.waitForTimeout(2000);

        const saveButton = page.locator('#button-save');
        await saveButton.click({ force: true });

        await page.waitForTimeout(2000);

        const confirmButton = page.locator('#button-confirm');
        await confirmButton.click();

        await page.waitForLoadState('networkidle');

        const confirmationMessage = page.locator('.page-title');
        await expect(confirmationMessage).toBeVisible();
        await expect(confirmationMessage).toHaveText('Your order has been placed!');
    });
});
