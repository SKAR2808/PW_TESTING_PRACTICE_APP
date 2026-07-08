import { test,expect  } from '@playwright/test';
test('Handle Get Button Text 1', async({page})=>{
    await page.goto('https://in.bookmyshow.com/')
     const varu = await page.locator('//p[@class="sc-1jg5yz-4 cVsVcL"]').allTextContents()
    console.log(varu)
    await page.locator('//p[@class="sc-1jg5yz-4 cVsVcL"]').nth(8).click();
    
    await expect(page).toHaveURL('https://in.bookmyshow.com/explore/home/kolkata')
})