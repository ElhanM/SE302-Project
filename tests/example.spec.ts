import { test, expect } from '@playwright/test'

test('simple basic test', async ({page}) =>{
    await page.goto('https://magento.softwaretestingboard.com/')
    const pageTite = await page.locator('.page-wrapper')
    await expect(pageTite).toBeVisible()
})


test('click on elements', async ({page}) =>{
    await page.goto('https://magento.softwaretestingboard.com/')
    await page.click('[href*="https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/"]')
    await page.type('#email', 'hamzasusic@example2.com')
    await page.type('#pass', 'suhi')
    await page.click('#send2')
    const errorMessage = await page.locator('.message-error')
    await expect(errorMessage).toContainText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')

})


