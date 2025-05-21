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

    newBoardClickHandler(){
        this.showModalPopup = true;
    }

    popupCloseHandler(){
        this.showModalPopup = false;
    }

    noOfSectionsChangeHandler(event){
        let noOfSections = event.target.value;
        this.sections = [];
        for(let i=0; i < noOfSections; i++){
            this.sections.push({
                id: i,
                sectionLabel: `Section ${i + 1} Title`})
        }
    }

    async handleSubmit(event){
        event.preventDefault();
        const fields = {...event.detail.fields};
        let sectionControls = this.template.querySelectorAll('[data-section-control]');
        let sectionList = [];

        for(let control of sectionControls){
            sectionList.push({ name: control.value});
            console.log('Test 5');
        }
            if(!this.validateData(fields, sectionList)){
                return;
            }
            let result = await saveBoard({'board': fields, 'sections': sectionList});
            this.showToast('Data Saved Successfully..');
            //this.popupCloseHandler();
            //setTimeout(() => this.popupCloseHandler(), 500);
            console.log('Test 6');
        
    }

        validateData(fields, sectionList){
            let sectionCount = parseInt(fields.NoOfSections__c);
            console.log('Test 1');
            if(!sectionCount || sectionCount <1 || sectionCount >10){
                this.showToast('Please enter valid number of sections value between 1 to 10', 'Error', 'error');
                return false;
                console.log('Test 2');
            }
            if(sectionList.filter(a => a.Name == '').length > 0){
                this.showToast('Please enter title for every section.', 'Error', 'error');
                return false;
                console.log('Test 2');
            }
            return true;
        }

        showToast(message, title='Success', variant='success'){
            console.log('Dispatching Toast:', { title, message, variant }); // Debug log
            const event = new ShowToastEvent({
                title,
                message,
                variant
            });
            this.dispatchEvent(event);
        }
        testToastHandler() {
        this.showToast('Test Toast Message', 'Test Title', 'info');
}
} 

