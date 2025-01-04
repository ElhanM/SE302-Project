import { test, expect } from '@playwright/test';

test.describe('Navigation Menu Interaction', () => {
    test('Menu links lead to correct categories', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    const categories = ['Laptops & Notebooks', 'Components', 'Tablets'];
    for (const category of categories) {
        await page.locator(`text=${category}`).click();
        await expect(page.locator('h2')).toHaveText(category);
      await page.goto('https://ecommerce-playground.lambdatest.io/'); // Return to home for next iteration
    }
    });
});
