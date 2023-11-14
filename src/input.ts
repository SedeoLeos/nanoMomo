import { Payer } from "./type";

export type CreateAccessInput = {
    
        user_api: string;
        api_key: string;  
}
export type ValidateAccountHolderStatusInput = CreateAccessInput & {
    accountHolderIdType: string;
    accountHolderId: string;
}
export type RequestToPayInput = CreateAccessInput & {
    referenceId:string
    version?:'v1_0'|'v2_0'
}
export type RequestGetAccountBalanceInput =CreateAccessInput &{
    currency?:string;
}
export type BodyRequestTopayInput= {
    
    amount:  string , 
    currency:  string , 
    externalId:  string , 
    paye : Payer , 
    payerMessage: string , 
    payeeNote: string 

}
export type RequesttoPayDeliveryNotificationInput = RequestToPayInput & {
    notificationMessage:string,
    language?:string,
}
export type BodyRequesttoPayDeliveryNotificationInput = {
    notificationMessage:string
}