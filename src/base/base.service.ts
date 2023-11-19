import axios, { AxiosInstance } from "axios";
import { CreateAccessInput, BcAuthorizeInput, BodyBcAuthorize, BodyOauth2Token, RequestGetUserInfoInput, ValidateAccountHolderStatusInput, RequestGetAccountBalanceInput, RequestToDepotInput, BodyRequestToDepotInput } from "../input";
import { PlayloadAccessToken, PlayloadBcauthorizeResponse, PlayloadOauth2, PlayloadRequestToPayResult, PlayloadUserInfo, PlayloadUserinfoWithConsent } from "../type";
import querystring from 'querystring';

export interface BaseServiceOptions {
    subscriptionId: string;
    env: string;
    callback?: string;
    baseUrl: string;
  }
export class BaseService {
    protected headers: any = {};
    protected baseUrl: string;
    protected callback?: string;
    protected axiosInstance: AxiosInstance;
  
    constructor(options: BaseServiceOptions) {
      this.headers["Ocp-Apim-Subscription-Key"] = options.subscriptionId;
      this.headers["X-Target-Environment"] = options.env;
      this.baseUrl = options.baseUrl;
      this.callback =options.callback;
      this.axiosInstance = axios.create({
        baseURL: this.baseUrl,
        headers: this.headers,
      });
    }
   setToken(token:string,type:'Basic'|'Bearer'='Bearer'):string{
    const _token = token.replace(/\s/g,'')
    return `${type} ${_token}`;

  }
    async createAccessToken(data: CreateAccessInput) {
      const { user_api, api_key } = data;
      try {
        const token = Buffer.from(user_api + ":" + api_key).toString("base64");
        const authorisation =this.setToken(token,'Basic')
        const headers = this.headers;
        headers["Authorization"] = authorisation;
        console.log(authorisation)
        const response = await this.axiosInstance.post<PlayloadAccessToken>(`token/`,{},{ headers }
        );
        if (response.status == 200) {
          return response.data;
        }
      } catch (e: any) {
        console.log(e.response.message);
        // console.log(e.response)
      }
      return null;
    }
    async bcAuthorize(data:BcAuthorizeInput,body:BodyBcAuthorize) {
      const url = this.baseUrl + "/v1_0/bc-authorize";
      const { api_key, user_api,callback} = data;
      const authPlayload = await this.createAccessToken({
        api_key,
        user_api,
      });
      if (!authPlayload) return null;
      const headers = this.headers;
     
      headers["X-Callback-Url"] = callback?callback:this.callback;
      headers['Content-Type']='application/x-www-form-urlencoded'
      headers["Authorization"] =this.setToken(authPlayload.access_token);
      try {
        const response = await this.axiosInstance.post<PlayloadBcauthorizeResponse>(url,querystring.stringify(body.toObject()),{headers})
        if(response.status ==200){
          return response.data
        }
      } catch (error) {
        
      }
      return null;
    } 
    async createOauth2Token(data:BcAuthorizeInput,body:BodyOauth2Token){
      const url =  "v1_0/oauth2/token";
      const { api_key, user_api,} = data;
      const auth = await this.createAccessToken({
        api_key,
        user_api,
      });
      if (!auth) return null;
      const headers = this.headers;
      headers['Content-Type']='application/x-www-form-urlencoded'
      headers["Authorization"] = "Bearer" + auth.access_token;
      try {
        const response =await this.axiosInstance.post<PlayloadOauth2>(url,querystring.stringify(body.toObject()),{headers})
        if( response.status==200){
          return response.data;
        }
      } catch (error) {
        
      }
      return null;
    }
  
    async getBasicUserInfo(data: RequestGetUserInfoInput) {
      const { user_api, api_key, accountHolderMSISDN } = data;
      const url = `v1_0/accountholder/msisdn/${accountHolderMSISDN}/basicuserinfo`;
      const authPlayload = await this.createAccessToken({
        api_key,
        user_api,
      });
     
      if (!authPlayload) return null;
     
      const headers = this.headers;
      headers["Authorization"] = this.setToken(authPlayload.access_token);
      try {
        const response = await this.axiosInstance.get<PlayloadUserInfo>(url, { headers });
        if(response.status==200) return response.data;
      } catch (errer) {
        const e = errer as any
       
        console.log(Object.values(e.config.headers))

      }
      return null;
    }
    async validateAccountHolderStatus(data: ValidateAccountHolderStatusInput) {
      const { accountHolderId, accountHolderIdType, user_api, api_key } = data;
      const authPlayload = await this.createAccessToken({
        user_api,
        api_key,
      });
      if (!authPlayload) return null;
      const url = `active`;
      const headers = this.headers;
      headers["Authorization"] =this.setToken(authPlayload.access_token);
      try {
        const response = await axios.get(
          `${url}/${accountHolderIdType}/${accountHolderId}`,
          {headers,}
        );
      } catch (e) {
        return false;
      }
    }
      
    async getUserInfoWithConsent(data:{
      Authorization:string,
    }) {
      const {Authorization}=data;
      const url =  "oauth2/v1_0/userinfo";
      const headers = this.headers;
      headers["Authorization"] = this.setToken(Authorization);
      try {
        const response = await this.axiosInstance.get<PlayloadUserinfoWithConsent>(url,{headers})
        if(response.status==200){
          return response.data;
        }
      } catch (error) {
        
      }
      return null
      
    }
    async getAccountBalance(data: RequestGetAccountBalanceInput) {
      const { api_key, user_api, currency } = data;
      const url = currency
        ?  `/v1_0/account/balance/${currency}`
        :  `/v1_0/account/balance`;
      const auth = await this.createAccessToken({
        api_key,
        user_api,
      });
      if (!auth) return null;
      const headers = this.headers;
      headers["Authorization"] = this.setToken(auth.access_token);
      try {
        const response = await this.axiosInstance.get(url, { headers });
        if (response.status == 200) {
          return response.data;
        }
      } catch (e) {}
      return null;
    }
    
}
export class BaseService2 extends BaseService {
  async transfer(data:RequestToDepotInput,body:BodyRequestToDepotInput){
    const {referenceId,user_api,api_key,callback} =data;
    const url = 'v1_0/transfer';
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
        if(response.status==202)return true;
    } catch (error) {
        
    }
    return false;

   }

   async getTransfrStatus(data:RequestToDepotInput){
    const {referenceId,user_api,api_key,callback} =data;
    const url = `v1_0/transfer/${referenceId}`;
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
}
