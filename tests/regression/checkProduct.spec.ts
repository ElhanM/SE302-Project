import { test, expect } from '@playwright/test';
import { CategoryCheck } from '../../page-objects/CategoryCheck';

test.describe('Product Details Page', () => {
    test('User can view details of a specific product', async ({ page }) => {
    const categoryPage = new CategoryCheck(page);
    await categoryPage.navigateToCameras();
    await page.locator('text=Nikon D300').click();
    await expect(page.locator('h1')).toHaveText('Nikon D300');
    await expect(page.locator('#product-description')).toBeVisible();
    await expect(page.locator('.price')).toContainText('$98.00');
    });
});
