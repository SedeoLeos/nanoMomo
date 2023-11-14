import axios from "axios";

import { uuid } from "uuidv4";

export class ProvioningController {
  referenceId: string;
  constructor(private pimarykey: string, private providerCallbackHost: string) {
    this.referenceId = this.generateRefence();
  }
  generateRefence() {
    return uuid();
  }

  async createUserId() {
   
    var config = {
      method: "post",
      url: "https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/",
      headers: {
        "Ocp-Apim-Subscription-Key": this.pimarykey,
        // "X-Target-Environment": "sandbox",
        "X-Reference-Id": this.referenceId,
      },
      body:{
        providerCallbackHost:this.providerCallbackHost
      }
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
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

    const response = await axios.post(url, option);
  }
}
