public with sharing class BoardController {
   
    @AuraEnabled
    public static string saveBoard(Board__c board, List<Board_Section__c> sections){
        try {
            insert board;

            for(Board_Section__c section : sections){
                section.Board__c = board.Id;
            }

            insert sections;
            return board.Id;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
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