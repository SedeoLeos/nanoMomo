import axios from "axios";

import { v4 as UuidV4 } from "uuid";

export class ProvioningController {
  referenceId: string;
  constructor(private pimarykey: string, private providerCallbackHost: string) {
    this.referenceId = this.generateRefence();
  }
  generateRefence() {
    return UuidV4();
  }

  async createUserId() {
    const url = "https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/";
    const headers = {
        "Ocp-Apim-Subscription-Key": this.pimarykey,
        "X-Target-Environment": "sandbox",
        "X-Reference-Id": this.referenceId,
      },
      body = {
        providerCallbackHost: this.providerCallbackHost,
      };

    try {
      const reponse = await axios.post(
        "https://sandbox.momodeveloper.mtn.com/v1_0/apiuser",
        body,
        {
          headers: {
            Accept: "application/json",
            "X-Target-Environment": "sandbox",
            "X-Reference-Id": this.referenceId,
            "Ocp-Apim-Subscription-Key": this.pimarykey,
          },
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
    const url = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${this.referenceId}/apikey`;
    const option = {
      headers: {
        "Content-Type": "application/json",
        "X-Target-Environment": "sandbox",
        "Ocp-Apim-Subscription-Key": this.pimarykey,
      },
    };
    try {
      const response = await axios.post<{
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
