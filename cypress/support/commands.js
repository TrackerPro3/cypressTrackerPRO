// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add("loadFixtures", (fixtureNames) =>
{
    cy.wrap(fixtureNames).each((fixtureName) =>{

        cy.fixture(fixtureName).as(fixtureName)
    })

})



Cypress.Commands.add("clickNavigationDropdown", (NavigationOption) => {

     //-----------------------------------------------------------------------------------------------

        /*This block of code is written to fetch all the Menu items and when text equals Management, 
        get the index of the webelement and click on the Management */

        cy.get('[data-toggle="dropdown"]').each(($el, index, $list) => { //gets all the elements with this css selector
            if ($el.text().includes(NavigationOption)) { //if text includes Management
                cy.get('[data-toggle="dropdown"]').eq(index).click() //gets the index of the webElement and click on that element which is on that index

            }
        })

    })

        //--------------------------------------------------------------------------------------------

 Cypress.Commands.add("selectClassification", (classificationName) => {

            cy.get('li[data-value]').each(($el, index, $list) => { 
            if ($el.text().includes(classificationName)) {
                cy.get('li[data-value]').eq(index).click()
                
            }
        })
 })

//-----------------------------------------------------------------------------------------------------

Cypress.Commands.add("selectHolderState", (holderState) => {

    cy.get('#cboHolderCurrentState-list li[data-value]').each(($hs, index, $list) => { 
    if ($hs.text().includes(holderState)) {
        cy.get('#cboHolderCurrentState-list li[data-value]').eq(index).click()
        
    }
})
})
// ----------------------------------------------------------------------------------------------------------

Cypress.Commands.add('getCurrentDateAndTime', () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
   
    const formattedDateAndTime = `${day}${month}${year}${hours}${minutes}${seconds}`;
    cy.wrap(formattedDateAndTime).as('currentDateAndTime');
   })
   //------------------------------------------------------------------------------------------------

   Cypress.Commands.add("selectINCState", (holderINCState) => {

    cy.get('#cboHolderIncorporationState-list li[data-value]').each(($el, index, $list) => { 
    if ($el.text().includes(holderINCState)) {
        cy.get('#cboHolderIncorporationState-list li[data-value]').eq(index).click()
        
    }
})
})

//------------------------------------------------------------------------------

Cypress.Commands.add("verifyHolderOnOverview", (savedholder) => {
    cy.get("[col-id='h_HolderName']").each(($el, index, $list) => {
        
       // cy.log($el.text())
       
       if($el.text().includes(savedholder)){
            cy.get("[col-id='h_HolderName']").eq(index).invoke('text').then((text) =>{
            cy.log(text)
            expect(text).to.equal(savedholder)
            })
            }
    })

})
//-----------------------------------------------------------------------------------------------------