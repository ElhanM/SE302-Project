import { Locator, Page } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class CategoryCheck extends ProductPage {
    readonly page: Page;
    readonly quantityInput: Locator;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.quantityInput = page.locator('#content td input');
    }
    async navigateToLaptopsAndNotebooks() {
    await this.page.goto('/index.php?route=product/category&path=18');
    }
    async navigateToCameras() {
    await this.page.goto('/index.php?route=product/category&path=57');
    }
}
