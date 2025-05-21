import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import BOARD_OBJECT from '@salesforce/schema/Board__c';
import ID_FIELD from "@salesforce/schema/Board__c.Id";
import NAME_FIELD from "@salesforce/schema/Board__c.Name";
import DESCRIPTION_FIELD from "@salesforce/schema/Board__c.Description__c";
import NO_OF_SECTIONS_FIELD from "@salesforce/schema/Board__c.NoOfSections__c";

export default class Board extends LightningElement {
    @track isModalOpen = false;
    @track boardName = '';
    @track boardDescription = '';
    @track noOfSections = 0;

    // Define the object API name for the Board__c object
    objectApiName = BOARD_OBJECT;

    // Define the field API names for the Name and Description fields
    nameField = NAME_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    noOfSectionsField = NO_OF_SECTIONS_FIELD;

    // Handle the change event of the Number of Sections input field
    handleNoOfSectionsChange(event) {
        this.noOfSections = parseInt(event.target.value, 10);
    }

    // Handle the success event of the record edit form
    handleSuccess() {
        this.showToast('Success', 'Board created successfully!', 'success');
        this.isModalOpen = false;
    }

    // Handle the error event of the record edit form
    handleError(event) {
        this.showToast('Error', 'Error creating board: ' + event.detail.message, 'error');
    }

    // Show a * message
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}
