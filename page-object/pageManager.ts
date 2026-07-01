import { Page , expect } from '@playwright/test'
import { NavigationPage } from '../page-object/navigationPage'
import { fromLayoutsPage } from '../page-object/fromLayoutsPage'
import { DatepickerPage } from '../page-object/datepickerPage'
export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly fromLayoutsPage: fromLayoutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.fromLayoutsPage = new fromLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)

    }

    navigateTo(){

        return this.navigationPage

    }

    onFromLayoutsPage(){

        return this.fromLayoutsPage

    }

    onDatepickerPage(){
        return this.datepickerPage
    }
}