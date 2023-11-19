import axios,{AxiosInstance} from "axios";

import { v4 as UuidV4 } from "uuid";

export class ProvioningController {
  headers = {};
  referenceId: string;
  axiosInstance:AxiosInstance 
  constructor(private pimarykey: string, private providerCallbackHost: string) {
    this.referenceId = this.generateRefence();
    this.headers = {
      "Ocp-Apim-Subscription-Key": this.pimarykey,
      "X-Target-Environment": "sandbox",
    }
    this.axiosInstance = axios.create({
      baseURL:'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser',
      headers:this.headers
    })
  }
  generateRefence() {
    return UuidV4();
  }

  async createUserId() {
    const headers = {
       ...this.headers,
        "X-Reference-Id": this.referenceId,
      },
      body = {
        providerCallbackHost: this.providerCallbackHost,
      };

    try {
      const reponse = await this.axiosInstance.post(
        '',
        body,
        {
          headers
        }
      );
      if (reponse.status == 201) {
        return {
          userApi: this.referenceId,
        };
      }
      return null;
    } catch (e) {
      const object = e as any;
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          console.log(property + ": " + object[property]);
        }
      }
      console.log(object.request);
      console.log(object.response.status);
    }
    return null;

  }
  async createApikey() {
    const url = `/${this.referenceId}/apikey`;
    const option = {
      headers: {
        "Content-Type": "application/json",
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": this.pimarykey,
      },
    };
    try {
      const response = await this.axiosInstance.post<{
        apiKey: string;
      }>(url, {}, option);
      if (response.status == 201) {
        return {
          apikey: response.data.apiKey,
        };
      }
    

    } catch (e) {}
    return null;

  }
}
