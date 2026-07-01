import { Page, expect } from "@playwright/test";

export class DatepickerPage{
    private readonly page : Page

    constructor(page: Page){
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
                
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)


       
        await expect(calendarInputField).toHaveValue(dateToAssert) 
}

async selectDatepickerWithRangeFromToday(startDateFromToday: number, endDayFromToday: number){
    const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertstart = await this.selectDateInTheCalendar(startDateFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertstart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert) 
}


private async selectDateInTheCalendar(numberOfDaysFromToday: number){
     let data = new Date()
        data.setDate(data.getDate()+ numberOfDaysFromToday) // Here you can seleect the date
        const expectedDate = data.getDate().toString()

        const expectedMonthShot = data.toLocaleDateString('En-US', {month: 'short'})
        const expectedMonthLong = data.toLocaleDateString('En-US', {month: 'long'})
        const expectedYear = data.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

        let calenderMonthhAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while(!calenderMonthhAndYear?.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calenderMonthhAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    
}
 await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
 return dateToAssert
}

    }