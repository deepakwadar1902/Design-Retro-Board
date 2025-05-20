import { LightningElement } from 'lwc';
import BOARD_OBJECT from '@salesforce/schema/Board__c';

export default class Boards extends LightningElement {

    showModalPopup = false;
    objectApiName = BOARD_OBJECT;

    newBoardClickHandler(){
        this.showModalPopup = true;
    }

    popupCloseHandler(){
        this.showModalPopup = false;
    }
}  