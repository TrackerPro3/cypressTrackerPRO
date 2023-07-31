///  <reference types = "Cypress" />
import CreateHolder from "../PageObjects/CreateHolder"

describe('Create Holder', function () {

    before(() => {
        //runs once before all the tests
        cy.getCurrentDateAndTime()
        const fixtureNames = ['loginData', 'createHolder', 'MenuLinks']
        cy.loadFixtures(fixtureNames)

        cy.get('@loginData').then((loginData) => {

            cy.visit(Cypress.env('url'))//Loads URL
            cy.wait(4000)
            cy.get('#txtUsername').type(loginData.email) //Enters Username
            cy.get("[value='Next']").click() //Click Next
            cy.get('#txtPassword').type(loginData.defaultPassword) //Enter Password
            cy.get("[value='Next']").click()  //Click Next
            cy.get('.alert-contents').invoke('text').then(text =>{
                if (text === (loginData.invalidPasswordMsg)) {
                    cy.get('#txtPassword').type(loginData.password)
                    cy.get("[value='Next']").click() //Click Next
                    cy.contains('QA - Srikanth').click() //Selects the 'QA - Srikanth' Org in select ORG Page
                    cy.get('#ctl00_cphToolbarItemsRight_toolbarSaveButton').click() //Click on Select
                    cy.get('#home').should('be.visible') //Assert whether we are on Home Page and Home is visible

                }
          
                else {
                    cy.title().then(title => {
                        switch (title) {
                            case 'Tracker®PRO - Login':
                                cy.get('input#txtNewPassword').type(loginData.password)
                                cy.get('input#txtVerifyPassword').type(loginData.password)
                                cy.get('input#ctl00_cphBody_btnLogin').click()
                                cy.contains('QA - Srikanth').click() //Selects the 'QA - Srikanth' Org in select ORG Page
                                cy.get('#ctl00_cphToolbarItemsRight_toolbarSaveButton').click() //Click on Select
                                cy.get('#home').should('be.visible') //Assert whether we are on Home Page and Home is visible
                                break
    
                            case 'Tracker®PRO - Select Organization':
                                cy.contains('QA - Srikanth').click() //Selects the 'QA - Srikanth' Org in select ORG Page
                                cy.get('#ctl00_cphToolbarItemsRight_toolbarSaveButton').click() //Click on Select
                                cy.get('#home').should('be.visible') //Assert whether we are on Home Page and Home is visible
                                break
    
                            case 'Tracker®PRO - Home':
                                cy.get('#home').should('be.visible') //Assert whether we are on Home Page and Home is visible
    
                                break
    
                        }
                    })
                    }
                
            })
            
            

        })

    })

    //This testcase is to create Holder with Brokerage as its classification
    it('Create Holder - Brokerage', function () {

        // Cypress.config('defaultCommandTimeout', 8000)

        const createHolder = new CreateHolder()

        cy.get('@MenuLinks').then((MenuLinks) => {
            cy.clickNavigationDropdown(MenuLinks.Management)
        })
        // cy.clickNavigationDropdown('Data')
        cy.get('[title="Create a new holder"]').click()
        //cy.get('#ctl00_lblPageTitle').should('have.value', 'Holder Detail')

        cy.get('@createHolder').then((createHolderData) => {

            cy.get('@currentDateAndTime').then((formattedDateAndTime) => {


                var resultHolderName = createHolder.holderNameVar(createHolderData.HolderName, formattedDateAndTime)
                cy.wrap(resultHolderName).then((value) => {

                    createHolder.holderName().type(resultHolderName)

                })
                createHolder.legalEntity().type(createHolderData.Entity)
                createHolder.classificationDropdown()
                cy.selectClassification(createHolderData.Brokerage)
                createHolder.fein().type(createHolderData.FEIN)
                createHolder.address1().type(createHolderData.Address1)
                createHolder.city().type(createHolderData.City)
                createHolder.holderStateDropdown()
                cy.selectHolderState('AR - Arkansas')
                createHolder.zipCode().type('97779')
                createHolder.incStatedropdown()
                cy.selectINCState('AK - Alaska')
                createHolder.save()
                cy.wait(10000)
                cy.get('.alert-contents').should('be.visible', { timeout: 10000 })
                cy.get('.alert-contents').should('have.text', 'Holder saved successfully', { timeout: 10000 })
                createHolder.close()
                cy.wait(10000)
                cy.verifyHolderOnOverview(resultHolderName)
                cy.log(resultHolderName)
            })

        })




    })


})