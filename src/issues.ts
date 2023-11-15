// file: src/types.ts
export interface AccessToken {
    // define the structure of your access token
  }
  
  export interface BcAuthorizeResponse {
    // define the structure of your business authorization response
  }
  
  // Add other interfaces for different responses if needed
  
  // file: src/services/AccessTokenService.ts
  import axios from "axios";
  
  export class AccessTokenService {
    static async createAccessToken(userApi: string, apiKey: string, baseUrl: string): Promise<AccessToken | null> {
      try {
        const authorization = "Basic " + Buffer.from(`${userApi}:${apiKey}`).toString("base64");
        const response = await axios.post<AccessToken>(`${baseUrl}/token/`, {}, {
          headers: { "Authorization": authorization },
        });
  
        if (response.status === 201) {
          return response.data;
        }
      } catch (error) {
        console.error(error.response?.status || "Error creating access token");
      }
  
      return null;
    }
  }
  
  // file: src/services/BcAuthorizeService.ts
  import axios from "axios";
  import querystring from 'querystring';
  
  export class BcAuthorizeService {
    static async bcAuthorize(data: BcAuthorizeInput, body: BodyBcAuthorize, accessToken: AccessToken | null, baseUrl: string): Promise<BcAuthorizeResponse | null> {
      const url = `${baseUrl}/v1_0/bc-authorize`;
  
      try {
        if (!accessToken) return null;
  
        const headers = {
          "Authorization": `Bearer ${accessToken}`,
          "X-Callback-Url": data.callbackUrl,
          "Content-Type": "application/x-www-form-urlencoded",
        };
  
        const response = await axios.post<BcAuthorizeResponse>(url, querystring.stringify(body.toObject()), { headers });
  
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.error("Error authorizing business transaction");
      }
  
      return null;
    }
  }
  
  // Add other service classes for different functionalities
  
  // file: src/collection.ts
  import { AccessTokenService } from "./services/AccessTokenService";
  import { BcAuthorizeService } from "./services/BcAuthorizeService";
  
  export class Collection {
    private headers: any = {};
    private baseUrl: string;
  
    constructor(
      private subscriptionId: string,
      private env: string,
      private callback: string,
      baseUrl: string = "https://sandbox.momodeveloper.mtn.com/collection"
    ) {
      this.headers["Ocp-Apim-Subscription-Key"] = subscriptionId;
      this.headers["X-Target-Environment"] = env;
      this.baseUrl = baseUrl;
    }
  
    async createAccessToken(data: CreateAccessInput): Promise<AccessToken | null> {
      return AccessTokenService.createAccessToken(data.userApi, data.apiKey, this.baseUrl);
    }
  
    async bcAuthorize(data: BcAuthorizeInput, body: BodyBcAuthorize, accessToken: AccessToken | null): Promise<BcAuthorizeResponse | null> {
      return BcAuthorizeService.bcAuthorize(data, body, accessToken, this.baseUrl);
    }
  
    // ... (other methods calling appropriate service classes)
  }
  