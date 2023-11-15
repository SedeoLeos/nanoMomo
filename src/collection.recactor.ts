import axios from "axios";
import querystring from 'querystring';
import {
  PlayloadAccessToken,
  PlayloadBcauthorizeResponse,
  PlayloadOauth2,
  PlayloadUserinfoWithConsent,
  PreApprovalResult,
  PaymentResult,
  PlayloadUserInfo,
} from "./type";
import {
  CreateAccessInput,
  RequestToPayInput,
  BcAuthorizeInput,
  BodyOauth2Token,
  BodyBcAuthorize,
  BodyInvoiceInput,
  BodyPreApproval,
} from "./input";

const COLLECTION_VERSION = "v1_0";

class AccessTokenService {
  static async createAccessToken(userApi: string, apiKey: string, baseUrl: string): Promise<PlayloadAccessToken | null> {
    try {
      const authorization = "Basic " + Buffer.from(`${userApi}:${apiKey}`).toString("base64");
      const response = await axios.post<PlayloadAccessToken>(`${baseUrl}/token/`, {}, {
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

class BcAuthorizeService {
  static async bcAuthorize(data: BcAuthorizeInput, body: BodyBcAuthorize, accessToken: string | null, baseUrl: string): Promise<PlayloadBcauthorizeResponse | null> {
    const url = `${baseUrl}/${COLLECTION_VERSION}/bc-authorize`;

    try {
      if (!accessToken) return null;

      const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "X-Callback-Url": data.callbackUrl,
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const response = await axios.post<PlayloadBcauthorizeResponse>(url, querystring.stringify(body.toObject()), { headers });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error authorizing business transaction");
    }

    return null;
  }
}

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

  async createAccessToken(data: CreateAccessInput): Promise<PlayloadAccessToken | null> {
    return AccessTokenService.createAccessToken(data.userApi, data.apiKey, this.baseUrl);
  }

  async bcAuthorize(data: BcAuthorizeInput, body: BodyBcAuthorize, accessToken: string | null): Promise<PlayloadBcauthorizeResponse | null> {
    return BcAuthorizeService.bcAuthorize(data, body, accessToken, this.baseUrl);
  }

  // ... (other methods calling appropriate service classes)
}
