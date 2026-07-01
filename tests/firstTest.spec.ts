import { test,expect  } from '@playwright/test'


test.beforeEach(async({page})=>{
await page.goto('http://localhost:4200/')
await page.getByText('Forms').click()
await page.getByText('Form Layouts').click()
})

test('Locator Syntex Rules',async({ page })=>{
    // by Tag Name
  await  page.locator('input').first().click()

    //by ID
     page.locator('#inputEmail1')

    // class value
    page.locator('.shape-rectangle')

    //by Attribute
    page.locator('[placeholder="Email"]')

    // by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine Different Selectors
    page.locator('input[placeholder="Email"][nbinput]')

    // by Xpath(not recomanded)

    page.locator('//*[@id="inputEmail1"]')
    
    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User Facing locator',async({page})=>{
   await page.getByRole('textbox',{name:"Email"}).first().click()
   await page.getByRole('button',{name:"SIGN IN"}).first().click()
   await page.getByRole('button',{name:"Submit"}).first().click()
   await page.getByLabel('Email').first().click()
   await page.getByPlaceholder('Jane Doe').click()
   await page.getByText('Using the Grid').click()
   await page.getByTestId('SignIn').click()
   await page.getByTitle('IoT Dashboard').click()
})

test('Locating Child Elements',async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button',{name: "Sign In"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Parent Loactor Element', async({page})=>{
await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox',{name:"Password"}).click()
await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name:"Email"}).click()
await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name:"Password"}).click()
await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox',{name: "Email"}).click()
await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click()
})

test('Reusing The Locator',async({page})=>{
    const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox',{name:"Email"})
await emailField.fill('test@gmail.com')
await basicForm.getByRole('textbox',{name:"Password"}).fill('Abc123')
await basicForm.locator('nb-checkbox').click()
await basicForm.getByRole('button').click()
await expect(emailField).toHaveValue('test@gmail.com')
})

test('Extracting Value',async({page})=>{
    // single test value
    const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 2")

    //input value

    const emailField =basicForm.getByRole('textbox',{name: "Email"})
    await emailField.fill('test@gmail.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@gmail.com')

    // PlaceHolder value

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})


// Assertion

test('Assertion',async({page})=>{
    const basicFormButton =  page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    //Generale Assertion
    const value =5
    expect(value).toEqual(5)
    const  text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion
  await  expect(basicFormButton).toHaveText('Submit')

  //soft Assertion
  await expect.soft(basicFormButton).toHaveText('Submit')
  await basicFormButton.click()
})