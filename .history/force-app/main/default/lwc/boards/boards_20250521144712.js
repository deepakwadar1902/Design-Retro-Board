import { LightningElement, api } from 'lwc';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
//Access object for lightning-edit-form
import BOARD_OBJECT from '@salesforce/schema/Board__c';
//Access field for lightning-edit-form use hard reference
import NAME_FIELD from '@salesforce/schema/Board__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Board__c.Description__c';
import NOOFSECTIONS_FIELD from '@salesforce/schema/Board__c.NoOfSections__c';
import saveBoard from '@salesforce/apex/BoardController.saveBoard';

export default class Boards extends LightningElement {

    showModalPopup = false;
    objectApiName = BOARD_OBJECT;   //Board__c its not good practice to use it
    nameField = NAME_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    noOfSectionsField = NOOFSECTIONS_FIELD;

    @api sections = [];

    // Method to open the modal
    handleOpenModal() {
        this.showModalPopup = true;
    }

    // Method to close the modal
    handleCloseModal() {
        this.showModalPopup = false;
    }

    // Method to handle the change event of the Number of Sections input field
    handleNoOfSectionsChange(event) {
        this.noOfSections = parseInt(event.target.value, 10);
    }

    // Method to handle the save event
    handleSave() {
        // Get the values of the input fields
        const name = this.template.querySelector('lightning-input[data-id="name"]').value;
        const description = this.template.querySelector('lightning-input[data-id="description"]').value;
        const noOfSections = this.template.querySelector('lightning-input[data-id="noOfSections"]').value;

        // Create an object to pass to the Apex method
        const boardData = {
            Name: name,
            Description__c: description,
            NoOfSections__c: noOfSections,
        };

        // Call the Apex method to save the board
        saveBoard({ board: boardData })
            .then(() => {
                // Show a success * message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Board saved successfully',
                        variant: 'success',
                    })
                );

                // Close the modal
                this.handleCloseModal();
            })
            .catch(error => {
                // Show an error * message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.message,
                        variant: 'error',
                    })
                );
            });
    }
}
