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
}