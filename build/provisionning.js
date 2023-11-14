"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvioningController = void 0;
const axios_1 = __importDefault(require("axios"));
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
        return new Promise(async (resolve, reject) => {
            const response = await axios_1.default.post(option.url, option);
            if (response.status > 244) {
                reject(response.data);
            }
            else {
                resolve({ responseCode: response.status, referenceId: this.referenceId });
            }
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
        return new Promise(async (resolve, reject) => {
            const response = await axios_1.default.post(option.url, option);
            if (response.status > 244) {
                reject(response.data);
            }
            else {
                resolve({ responseCode: response.status, referenceId: this.referenceId, apikey: response.data.apikey });
            }
        });
    }
}
exports.ProvioningController = ProvioningController;
