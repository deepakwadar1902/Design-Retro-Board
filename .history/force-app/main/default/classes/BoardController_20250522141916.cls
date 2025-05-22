public with sharing class BoardController {
   
    @AuraEnabled
    public static Id saveBoard(Board__c board, List<BoardSection__c> sections) {
    System.debug('Board Data: ' + board);
    System.debug('Sections Data: ' + sections);

    try {
        insert board; // Insert the board
        System.debug('Board inserted with Id: ' + board.Id);

        for (BoardSection__c section : sections) {
            section.Board__c = board.Id; // Associate sections with the board
        }

        insert sections; // Insert the sections
        System.debug('Sections inserted successfully');

        return board.Id;
    } catch (Exception e) {
        System.debug('Error in saveBoard: ' + e.getMessage());
        throw new AuraHandledException('Error saving board: ' + e.getMessage());
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