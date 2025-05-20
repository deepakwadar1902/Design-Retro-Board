import { LightningElement } from 'lwc';
//Access object for lightning-edit-form
import BOARD_OBJECT from '@salesforce/schema/Board__c';
//Access field for lightning-edit-form use hard reference
import NAME_FIELD from '@salesforce/schema/Board__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Board__c.Description__c';
import NOOFSECTIONS_FIELD from '@salesforce/schema/Board__c.NoOfSections__c';

export default class Boards extends LightningElement {

    showModalPopup = false;
    objectApiName = BOARD_OBJECT;   //Board__c its not good practice to use it
    nameField = NAME_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    noOfSectionsField = NOOFSECTIONS_FIELD;

    newBoardClickHandler(){
        this.showModalPopup = true;
    }

    popupCloseHandler(){
        this.showModalPopup = false;
    }
}  