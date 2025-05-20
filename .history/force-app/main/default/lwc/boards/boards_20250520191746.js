import { LightningElement } from 'lwc';

export default class Boards extends LightningElement {

    showModalPopup = false;

    newBoardClickHandler(){
        this.showModalPopup = true;
    }

    popupCloseHandler(){
        this.showModalPopup = false;
    }
}  