public with sharing class BoardController {

        @AuraEnabled
        public static Id saveBoard(Board__c board, List<Board_Section__c> sections) {
        System.debug('Board Data: ' + board);
        System.debug('Sections Data: ' + sections);

        try {
            // Validate Board
            if (board == null || String.isBlank(board.Name)) {
                throw new AuraHandledException('Board Name is required.');
            }

            // Insert Board
            insert board;
            System.debug('Board inserted with Id: ' + board.Id);

            // Validate and Insert Sections
            if (sections != null && !sections.isEmpty()) {
                for (Board_Section__c section : sections) {
                    if (String.isBlank(section.Name)) {
                        throw new AuraHandledException('Each Section must have a name.');
                    }
                    section.Board__c = board.Id; // Associate section with the board
                    System.debug('Prepared Section: ' + section);
                }

                // Insert Sections
                insert sections;
                System.debug('Sections inserted successfully.');
            } else {
                System.debug('No sections provided.');
            }

            // Return the Board Id
            return board.Id;

        } catch (DmlException dmlEx) {
            System.debug('DML Exception: ' + dmlEx.getMessage());
            throw new AuraHandledException('DML error: ' + dmlEx.getMessage());
        } catch (Exception ex) {
            System.debug('Unexpected Exception: ' + ex.getMessage());
            throw new AuraHandledException('Unexpected error: ' + ex.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Board__c> getBoards(){
        try {
            List<Board__c> boards = [Select Id, Name, Description__c, NoOfSections__c from Board__c ORDER BY CreatedDate DESC];
            return boards;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
