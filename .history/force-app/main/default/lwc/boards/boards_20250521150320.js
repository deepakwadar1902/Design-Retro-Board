import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import BOARD_OBJECT from '@salesforce/schema/Board__c';
import ID_FIELD from "@salesforce/schema/Board__c.Id";
import NAME_FIELD from "@salesforce/schema/Board__c.Name";
import DESCRIPTION_FIELD from "@salesforce/schema/Board__c.Description__c";
import NO_OF_SECTIONS_FIELD from "@salesforce/schema/Board__c.NoOfSections__c";

export default class Boards extends LightningElement {
    @track showModalPopup = false;
    @track boardName = '';
    @track boardDescription = '';
    @track noOfSections = 0;
    @track sections = [];

    // Define the object API name for the Board__c object
    objectApiName = BOARD_OBJECT;

    // Define the field API names for the Name and Description fields
    nameField = NAME_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    noOfSectionsField = NO_OF_SECTIONS_FIELD;

    // Handle the change event of the Number of Sections input field
    noOfSectionsChangeHandler(event) {
        this.noOfSections = parseInt(event.target.value, 10);
        this.sections = Array.from({ length: this.noOfSections }, (_, i) => ({
            id: i + 1,
            sectionLabel: `Section ${i + 1} Name`,
            sectionName: ''
        }));
    }

    // Handle the form submit event
    handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission

        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.boardName;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.boardDescription;
        fields[NO_OF_SECTIONS_FIELD.fieldApiName] = this.noOfSections;

        this.sections.forEach(section => {
            fields[`Section_${section.id}__c`] = section.sectionName;
        });

        const recordInput = { apiName: BOARD_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(() => {
                this.showToast('Success', 'Board created successfully!', 'success');
                this.showModalPopup = false;
            })
            .catch(error => {
                this.showToast('Error', 'Error creating board: ' + error.body.message, 'error');
            });
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

    // Handle the new board button click event
    newBoardClickHandler() {
        this.showModalPopup = true;
    }

    // Handle the popup close button click event
    popupCloseHandler() {
        this.showModalPopup = false;
    }
}
