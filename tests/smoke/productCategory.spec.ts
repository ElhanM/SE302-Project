import { test, expect } from '@playwright/test';
test.describe('View Product Category', () => {
    test('Product category page loads and displays products', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    await page.locator('a:has-text("Cameras")').click();
    await expect(page.locator('h1')).toHaveText('Cameras');
    const products = page.locator('.product-thumb');
    await expect(products.count()).toBeGreaterThan(1);  
    });
});
