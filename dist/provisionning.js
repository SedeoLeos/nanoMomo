"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvioningController = void 0;
const request = require("request");
const uuidv4_1 = require("uuidv4");
class ProvioningController {
    constructor(pimarykey, providerCallbackHost) {
        this.pimarykey = pimarykey;
        this.providerCallbackHost = providerCallbackHost;
        this.referenceId = this.generateRefence();
    }
    generateRefence() {
        return (0, uuidv4_1.uuid)();
    }
    async createUserId() {
        const option = {
            method: "POST",
            url: "https://sandbox.momodeveloper.mtn.com/v1_0/apiuser",
            headers: {
                "Content-Type": "application/json",
                "X-Reference-Id": this.referenceId,
                "X-Target-Environment": "sandbox",
                "Ocp-Apim-Subscription-Key": this.pimarykey,
            },
            body: {
                providerCallbackHost: this.providerCallbackHost,
            },
        };
        return new Promise((resolve, reject) => {
            request(option, (error, response) => {
                if (error) {
                    reject(error);
                }
                else {
                    const requestToPay = response.statusCode;
                    if (requestToPay == 202) {
                    }
                    resolve({ responseCode: requestToPay, referenceId: this.referenceId });
                }
            });
        });
    }
    async createApikey() {
        const option = {
            method: "POST",
            url: `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${this.referenceId}/apikey`,
            headers: {
                "Content-Type": "application/json",
                "X-Target-Environment": "sandbox",
                "Ocp-Apim-Subscription-Key": this.pimarykey,
            },
        };
        return new Promise((resolve, reject) => {
            request(option, (error, response) => {
                if (error) {
                    reject(error);
                }
                else {
                    const requestToPay = response.statusCode;
                    if (requestToPay == 202) {
                    }
                    const data = JSON.parse(response.body).apikey;
                    resolve({ responseCode: requestToPay, referenceId: this.referenceId, apikey: data });
                }
            });
        });
    }
}
exports.ProvioningController = ProvioningController;
