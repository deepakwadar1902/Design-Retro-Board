import { LightningElement } from 'lwc';
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

    sections = [];

    // Method to open the modal
    handleOpenModal() {
        this.showModalPopup = true;
    }

    // Method to close the modal
    handleCloseModal() {
        this.showModalPopup = false;
    }

    // Method to show * message
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    // Method to handle save button click
    handleSave() {
        const fields = {};
        fields[this.nameField.fieldApiName] = this.nameField.value;
        fields[this.descriptionField.fieldApiName] = this.descriptionField.value;
        fields[this.noOfSectionsField.fieldApiName] = this.noOfSectionsField.value;

        const recordInput = { apiName: this.objectApiName.objectApiName, fields };
        saveBoard({ board: recordInput })
            .then(() => {
                this.showToast('Success', 'Data Saved Successfully..', 'success');
                this.showModalPopup = false;
            })
            .catch(error => {
                this.showToast('Error', 'Error saving data', 'error');
                console.error('Error saving board:', error);
            });
    }
}
