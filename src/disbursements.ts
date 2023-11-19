import {  BaseService2 } from "./base/base.service";
import { BodyRequestToDepotInput, BodyRequestToRefund, CreateAccessInput, RequestToDepotInput } from "./input";
import { PlayloadRequestToPayResult } from "./type";

export class Distribution extends BaseService2 {

    /*
    L'opération de dépôt est utilisée pour déposer un montant du compte 
    du propriétaire vers un compte du bénéficiaire.
    Le statut de la transaction peut être validé en utilisant 
    le GET /deposit/{referenceId }
    */
   async createDepot(data:RequestToDepotInput,body:BodyRequestToDepotInput){
    const {referenceId,user_api,api_key,callback,version} =data;
    const url = `${version?version:'v1_0'}/deposit`;
    const headers = this.headers;
    headers['X-Reference-Id'] = referenceId;
    headers['X-Callback-Url'] = callback ? callback : this.callback;
    const authPlayload = await this.createAccessToken({
        api_key:api_key,
        user_api:user_api
    })
    if(!authPlayload) return null;
    headers['Authorization'] = this.setToken(authPlayload?.access_token);
    try {
        const response = await this.axiosInstance.post(url,body,{headers});
        if(response.status==202) return true;
    } catch (error) {
        
    }
    return false;
   }








   async getDepositStatus(data:RequestToDepotInput){
    const {referenceId,user_api,api_key,callback} =data;
    const url = `v1_0/deposit/${referenceId}`;
    const headers = this.headers;
    headers['X-Callback-Url'] = callback ? callback : this.callback;
    const authPlayload = await this.createAccessToken({
        api_key:api_key,
        user_api:user_api
    })
    if(!authPlayload) return null;
    headers['Authorization'] = this.setToken(authPlayload?.access_token);
    try {
        const response = await this.axiosInstance.get<PlayloadRequestToPayResult>(url,{headers});
        if(response.status==200)return response.data;
    } catch (error) {
        
    }
    return null;
   }






   async getRefundStatus(data:RequestToDepotInput){
    const {referenceId,user_api,api_key,callback} =data;
    const url = `v1_0/refund/${referenceId}`;
    const headers = this.headers;
    headers['X-Callback-Url'] = callback ? callback : this.callback;
    const authPlayload = await this.createAccessToken({
        api_key:api_key,
        user_api:user_api
    })
    if(!authPlayload) return null;
    headers['Authorization'] = this.setToken(authPlayload?.access_token);
    try {
        const response = await this.axiosInstance.get<PlayloadRequestToPayResult>(url,{headers});
        if(response.status==200)return response.data;
    } catch (error) {
        
    }
    return null;
   }










   async refund(data:RequestToDepotInput,body:BodyRequestToRefund){
    const {referenceId,user_api,api_key,callback,version} =data;
    const url = `${version?version:'v1_0'}/refund`;
    const headers = this.headers;
    headers['X-Reference-Id'] = referenceId;
    headers['X-Callback-Url'] = callback ? callback : this.callback;
    const authPlayload = await this.createAccessToken({
        api_key:api_key,
        user_api:user_api
    })
    if(!authPlayload) return null;
    headers['Authorization'] = this.setToken(authPlayload?.access_token);
    try {
        const response = await this.axiosInstance.post(url,body,{headers});
        if(response.status==202) return true;
    } catch (error) {
        
    }
    return false;

   }




   
   
}