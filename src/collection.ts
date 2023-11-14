import axios from "axios";
import { PlayloadAccessToken, PlayloadRequestToPayResult } from "./type";
import {
    BodyRequestTopayInput,
  BodyRequesttoPayDeliveryNotificationInput,
  CreateAccessInput,
  RequestGetAccountBalanceInput,
  RequestToPayInput,
  RequesttoPayDeliveryNotificationInput,
  ValidateAccountHolderStatusInput,
} from "./input";

export class Colloction {
  private headers: any = {};
  constructor(private url: string, subricription_id: string, env: string,private callback:string) {
    this.url = "https://sandbox.momodeveloper.mtn.com/collection";
    this.headers["Ocp-Apim-Subscription-Key"] = subricription_id;
    this.headers["X-Target-Environment"] = env;
  }

  async createAccessToken(data: CreateAccessInput) {
    const { user_api, api_key } = data;
    try {
      const authorisation =
        "Basic " + Buffer.from(user_api + ":" + api_key).toString("base64");
      const headers = this.headers;
      headers["Authorization"] = authorisation;
      const response = await axios.post<PlayloadAccessToken>(
        `${this.url}/token/`,
        {},
        { headers }
      );
      console.log(response.data);
      if (response.status == 201) {
        return response.data;
      }
    } catch (e: any) {
      console.log(e.response.status);
      // console.log(e.response)
    }
    return null;
  }
  async BcAuthorize(){
    const url = this.url + 'v1_0/bc-authorize'
  }
  async requestTopay(data:RequestToPayInput,body:BodyRequestTopayInput){
    const url = this.url + '/v1_0/requesttopay';
    const {api_key,user_api,referenceId} = data;
    const auth = await this.createAccessToken({
        api_key,
        user_api
    })
    if(!auth) return null;
    const headers = this.headers;
    headers['X-Reference-Id'] =referenceId;
    headers['Authorization']= 'Bearer' + auth.access_token;
    try{
        const response = await axios.post(url,body,{headers})
        if(response.status==202){
            return true;
        }
    }catch(e){

    }
    return null;
  }
  async requesttoPayDeliveryNotification(data:RequesttoPayDeliveryNotificationInput,body:BodyRequesttoPayDeliveryNotificationInput){
      const {api_key,user_api,referenceId,language,notificationMessage} = data;
      const url = this.url + `/v1_0/requesttopay/${referenceId}/deliverynotification`;
    const auth = await this.createAccessToken({
        api_key,
        user_api
    })
    if(!auth) return null;
    const headers = this.headers;
    headers['X-Reference-Id'] =referenceId;
    headers['Authorization']= 'Bearer' + auth.access_token;
    headers['notificationMessage']= notificationMessage;
    headers['Language']= language;
    try{
        const response = await axios.post(url,body,{headers})
        if(response.status==202){
            return true;
        }
    }catch(e){

    }
    return null;
  }
  async getAccountBalance(data:RequestGetAccountBalanceInput) {
    const {api_key,user_api,currency}=data;
    const url =currency? this.url + `/v1_0/account/balance/${currency}`:this.url + `/v1_0/account/balance`;
    const auth = await this.createAccessToken({
        api_key,
        user_api
    })
    if(!auth) return null;
    const headers = this.headers;
    headers['Authorization']= 'Bearer' + auth.access_token;
    try{
        const response =await axios.get(url,{headers});
        if(response.status==200){
            return response.data;
        }

    }catch(e){}
    return null;
  }
  async GetBasicUserinfo() {}
  getInvoiceStatus() {}
  getPaymentStatus() {}
  getPreApprovalStatus() {}
  getUserInfoWithConsent() {
    const url = this.url +'oauth2/v1_0/userinfo'

    // PlayloadUserinfoWithConsent
  }
  async requestToWithdraw(data:RequestToPayInput,body:BodyRequestTopayInput){
    const { referenceId, user_api, api_key,version } = data;
    const version_r = version?version:'v1_0'
    const token = await this.createAccessToken({
      user_api,
      api_key,
    }); if (!token) return null;
    const url = `${this.url}/${version_r}/requesttowithdraw`;
    const headers = this.headers;
    headers["Authorization"] = "Bearer " + token.access_token;
    try {
      const response = await axios.post<PlayloadRequestToPayResult>(
        `${url}/${referenceId}`,
        body,
        {
          headers,
        }
      );
      if (response.status == 202) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }
  async requesttoPayTransactionStatus(data: RequestToPayInput) {
    const { referenceId, user_api, api_key } = data;
    const token = await this.createAccessToken({
      user_api,
      api_key,
    }); if (!token) return null;
    const url = `${this.url}/requesttopay`;
    const headers = this.headers;
    headers["Authorization"] = "Bearer " + token.access_token;
    try {
      const response = await axios.get<PlayloadRequestToPayResult>(
        `${url}/${referenceId}`,
        {
          headers,
        }
      );
      if (response.status == 200) {
        return response.data;
      }
    } catch (e) {
      return false;
    }
    return null;
  }
  async requestToWithdrawTransactionStatus(
    data: RequestToPayInput
  ) {
    const { referenceId, user_api, api_key } = data;
    const token = await this.createAccessToken({
      user_api,
      api_key,
    });
    if (!token) return null;
    const url = `${this.url}/requesttowithdraw`;
    const headers = this.headers;
    headers["Authorization"] = "Bearer " + token.access_token;
    try {
      const response = await axios.get<PlayloadRequestToPayResult>(
        `${url}/${referenceId}`,
        {
          headers,
        }
      );
      if (response.status == 200) {
        return response.data;
      }
    } catch (e) {
      return false;
    }
    return null;
  }

  async validateAccountHolderStatus(data: ValidateAccountHolderStatusInput) {
    const { accountHolderId, accountHolderIdType, user_api, api_key } = data;
    const token = await this.createAccessToken({
      user_api,
      api_key,
    });
    if (!token) return null;
    const url = `${this.url}/active`;
    const headers = this.headers;
    headers["Authorization"] = "Bearer " + token.access_token;
    try {
      const response = await axios.get(
        `${url}/${accountHolderIdType}/${accountHolderId}`,
        {
          headers,
        }
      );
    } catch (e) {
      return false;
    }
  }
}