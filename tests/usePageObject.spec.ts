
import {test, expect} from '@playwright/test'
import { PageManager } from '../page-object/pageManager'


test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test('Navigate to form Page', async({page})=>{
    const pm = new PageManager(page)
   
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()



})

/**
 * this method will out the inline form   with user details
 * @param name - should be first and last name
 * @param email - valid email for test user 
 * @param rememberMe - Option check box remember me booliean 
 */

test('parametrized methods',async({page})=>{
        const pm = new PageManager(page)

 await pm.navigateTo().formLayoutPage()
 await pm.onFromLayoutsPage().submitUsingTheGridFromWithCredentialAndSelectOption('test@gmail.com', 'Wlecom1', 'Option 2')
 await pm.onFromLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('Sayan Kar', 'sayan@gmail.com', false)
 await pm.navigateTo().datepickerPage()
 await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
 await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(3,7)
})