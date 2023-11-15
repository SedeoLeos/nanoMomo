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
export type RequestGetUserInfoInput =CreateAccessInput & {
    accountHolderMSISDN:string,
}
export type RequestGetAccountBalanceInput =CreateAccessInput &{
    currency?:string;
}
export type BodyRequestTopayInput= {
    
    externalId:  string , 
    amount:  string , 
    currency:  string , 
    payee : Payer , 
    payerMessage: string , 
    payeeNote: string 

}
export type BodyInvoiceInput =Omit<BodyRequestTopayInput,'payerMessage'|'payeeNote'> & {
    validityDuration:string,
    intendedPayer:Payer,
    description:string
}
export type RequesttoPayDeliveryNotificationInput = RequestToPayInput & {
    notificationMessage:string,
    language?:string,
}
export type BodyRequesttoPayDeliveryNotificationInput = {
    notificationMessage:string
}
export type LoginHint = (msisdn: string) => string;
export const createLoginHint : LoginHint =(msisdn)=>`ID:${msisdn}/MSISDN`;
export type BcAuthorizeInput = CreateAccessInput & {
}
export class BodyBcAuthorize  {
    readonly login_hint: string;
    readonly scope: string;
    readonly access_type: 'online' | 'offline';

  constructor(login_hint: string, scope: string, access_type: 'online' | 'offline') {
    this.login_hint = `ID:${login_hint}/MSISDN`;
    this.scope = scope;
    this.access_type = access_type;
  }
  toObject(): Record<string, string | number | boolean | readonly number[] | readonly string[] | readonly boolean[] | null> {
    return {
      login_hint: this.login_hint,
      scope: this.scope,
      access_type: this.access_type,
    };
  }

}
export class BodyOauth2Token  {
    readonly grant_type: string;
    readonly auth_req_id: string;

  constructor( auth_req_id: string) {
    this.grant_type = `urn:openid:params:grant-type:ciba`;
    this.auth_req_id = auth_req_id;
  }
  toObject(): Record<string, string | number | boolean | readonly number[] | readonly string[] | readonly boolean[] | null> {
    return {
      grant_type: this.grant_type,
      auth_req_id: this.auth_req_id,
    };
  }

}