public with sharing class BoardController {

    // Method to save Board and related Board Sections
    @AuraEnabled
    public static Id saveBoard(Board__c board, List<Board_Section__c> sections) {
        System.debug('Board Data: ' + board);
        System.debug('Sections Data: ' + sections);

        try {
            // Validate Board input
            if (board == null || String.isBlank(board.Name)) {
                throw new AuraHandledException('Board Name is required.');
            }

            // Insert the board
            insert board;
            System.debug('Board inserted with Id: ' + board.Id);

            // Validate and link sections
            if (sections != null && !sections.isEmpty()) {
                for (Board_Section__c section : sections) {
                    if (String.isBlank(section.Name)) {
                        throw new AuraHandledException('Each Section must have a name.');
                    }
                    section.Board__c = board.Id; // Associate the section with the board
                }
                // Insert all sections
                insert sections;
                System.debug('Sections inserted successfully');
            } else {
                System.debug('No sections provided.');
            }

            // Return the created board Id
            return board.Id;

        } catch (DmlException dmlEx) {
            System.debug('DML Exception: ' + dmlEx.getMessage());
            throw new AuraHandledException('Error saving board or sections: ' + dmlEx.getMessage());
        } catch (Exception ex) {
            System.debug('Unexpected Exception: ' + ex.getMessage());
            throw new AuraHandledException('Unexpected error: ' + ex.getMessage());
        }
    }

    // Method to retrieve Boards
    @AuraEnabled(cacheable = true)
    public static List<Board__c> getBoards() {
        try {
            // Fetch all Boards ordered by creation date
            List<Board__c> boards = [SELECT Id, Name, Description__c, NoOfSections__c 
                                      FROM Board__c 
                                      ORDER BY CreatedDate DESC];
            System.debug('Fetched Boards: ' + boards);
            return boards;

        } catch (Exception e) {
            System.debug('Error fetching boards: ' + e.getMessage());
            throw new AuraHandledException('Error fetching boards: ' + e.getMessage());
        }
    }
}
