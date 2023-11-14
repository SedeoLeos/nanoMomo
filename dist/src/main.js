"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const provisionning_1 = require("../provisionning");
async function main() {
    const provi = new provisionning_1.ProvioningController('7e3a27b2493d43f08c6ff9f1461cc273', 'https://webhook.site/5f14ce76-d699-4b14-933a-f58f82a910c7');
    console.log('+++++++++++');
    await provi.createUserId();
    await provi.createApikey();
}
main();
