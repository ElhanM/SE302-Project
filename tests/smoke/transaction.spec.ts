import { chromium } from 'playwright';
import { Transactions } from '../../page-objects/Transaction'

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/transaction');

    const laptopiPage = new Transactions(page);

    console.log('Checking for list of menus...');
    console.log(await laptopiPage.listExists() ? 'List of menus exists.' : 'List of menus does not exist.');
    console.log('Checking for yourBalance...');
    console.log(await laptopiPage.yourBalanceExists() ? 'Information about balance exists.' : 'Information about balance does not exist.');
    console.log('Checking for navigation bar...');
    console.log(await laptopiPage.navBarExists() ? 'Navigation bar exists.' : 'Navigation bar does not exist.');
    console.log('Checking for Table...');
    console.log(await laptopiPage.TableExists() ? 'Table exists.' : 'Table does not exist.');
    console.log('Checking for footer...');
    console.log(await laptopiPage.footerExists() ? 'Footer exists.' : 'Footer does not exist.');
    console.log('Checking for page numberlink...');
    console.log(await laptopiPage.pageNumberExists() ? 'Page number exists.' : 'Page number does not exist.');

    await browser.close();
})();
