import { Locator, Page  } from "@playwright/test";


export class NavigationPage {

readonly page: Page
readonly fromLayoutsManuItem: Locator
readonly datePickerMenuItem: Locator
readonly smartTabletMenuItem: Locator
readonly toastrMenuItem: Locator
readonly tooltipMenuItem: Locator

    constructor(page: Page){
this.page = page
this.fromLayoutsManuItem = page.getByText('Form Layouts')
this.datePickerMenuItem = page.getByText('Datepicker')
this.smartTabletMenuItem = page.getByText('Smart Table')
this.toastrMenuItem = page.getByText('Toastr')
this.tooltipMenuItem = page.getByText('Tooltip')
    }
async formLayoutPage(){
   
      await this.selectGroupMenuItem('Forms')
        await this.fromLayoutsManuItem.click()
}

async datepickerPage(){
    
    await this.selectGroupMenuItem('Forms')
    
        await this.datePickerMenuItem.click()

} 

async smartTablePage(){
      await this.selectGroupMenuItem('Tables & Data')
           
    await this.smartTabletMenuItem.click()

}

async toastrPage(){
    await this.selectGroupMenuItem('Modal & Overlays')
   
    await this.toastrMenuItem.click()
}

async tooltipPage(){
     await this.selectGroupMenuItem('Modal & Overlays')
   
    await this.tooltipMenuItem.click()

}



private async selectGroupMenuItem(groupItemTitle: string){
const groupMenuItem = this.page.getByTitle(groupItemTitle)
const expandedState = await groupMenuItem.getAttribute('aria-expanded')
if(expandedState == "false")
{
    await groupMenuItem.click()
}
}

}