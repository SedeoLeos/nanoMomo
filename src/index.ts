import { ProvioningController } from "./provisionning";


async function main (){
    const provi = new ProvioningController('b0f5afe7e38f499383c49cb472ba60b9','https://webhook.site/5f14ce76-d699-4b14-933a-f58f82a910c7');
    console.log('+++++++++++')
    await provi.createUserId()
    // await provi.createApikey()


}
main();
