class CreateHolder {

    holderName() {
        return cy.get('#ctl00_cphBody_txtHolderCurrentName:visible')
    }
    holderNameVar(String1, String2){
            return String1 + ' ' + String2
    }

    legalEntity() {
        return cy.get('#ctl00_cphBody_txtLegalEntityName:visible')
    }

    classificationDropdown(){
        return cy.get('#cboHolderCurrentClassification-button').click()
    }
     
    fein()
    {
        return cy.get('#ctl00_cphBody_txtHolderCurrentFedId')
    }

    address1(){
        return cy.get('#ctl00_cphBody_txtHolderCurrentAddress1')
    }
     
    city(){
        return cy.get('#ctl00_cphBody_txtHolderCurrentCity')
    }

    holderStateDropdown(){
        return cy.get('#cboHolderCurrentState-button').click()
    }

    incStatedropdown(){
        return cy.get('#cboHolderIncorporationState-button').click()
    }

    zipCode(){
        return cy.get('input#ctl00_cphBody_txtHolderCurrentZip')
    }

    save(){
        return cy.get('#ctl00_cphToolbarItemsRight_toolbarSaveButton').click()
    }

    close(){
        return cy.get('#ctl00_cphToolbarItemsRight_toolbarCloseButton').click()
    }
}

export default CreateHolder;