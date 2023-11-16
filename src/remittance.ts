import {  BaseService2 } from "./base/base.service";
import { RequestToDepotInput } from "./input";
import { PlayloadCashTransfer } from "./type";

export class Remittance extends BaseService2 {
    
async cashTransfer(data: RequestToDepotInput,body:PlayloadCashTransfer){
    const {referenceId,user_api,api_key,callback} =data;
    const url = `v2_0/cashtransfer`;
    const headers = this.headers;
    headers['X-Callback-Url'] = callback ? callback : this.callback;
    headers['X-Reference-Id'] = referenceId;
    const authPlayload = await this.createAccessToken({
        api_key:api_key,
        user_api:user_api
    })
    if(!authPlayload) return null;
    headers['Authorization'] = this.setToken(authPlayload?.access_token);
    try {
        const response = await this.axiosInstance.post(url,body,{headers});
        if(response.status==202)return true;
    } catch (error) {
        
    }
    return false;
}

async getCashTransferStatus(data: RequestToDepotInput){
    const {referenceId,user_api,api_key,callback} =data;
    const url = `v2_0/cashtransfer/${referenceId}`;
    const headers = this.headers;
    headers['X-Callback-Url'] = callback ? callback : this.callback;
    const authPlayload = await this.createAccessToken({
        api_key:api_key,
        user_api:user_api
    })
    if(!authPlayload) return null;
    headers['Authorization'] = this.setToken(authPlayload?.access_token);
    try {
        const response = await this.axiosInstance.get<PlayloadCashTransfer>(url,{headers});
        if(response.status==200)return response.data;
    } catch (error) {
        
    }
    return null;
   

}
}