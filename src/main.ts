import { Colloction } from "./collection";
import { ProvioningController } from "./provisionning";

async function main() {
  const callbackhost =
    "https://webhook.site/5f14ce76-d699-4b14-933a-f58f82a910c7";
  const subriction_id = "b0f5afe7e38f499383c49cb472ba60b9";
  const provi = new ProvioningController(subriction_id, callbackhost);
  console.log("+++++++++++");
  const userApi = await provi.createUserId();
  const apikey = await provi.createApikey();
  if (apikey == null) {
    return null;
  }
  if (userApi == null) {
    return null;
  }
  console.log(apikey, userApi);
  const collection = new Colloction({
    env:'sandbox',
    baseUrl:'https://sandbox.momodeveloper.mtn.com/collection',
    subscriptionId:'b0f5afe7e38f499383c49cb472ba60b9',
  });
  const result = await collection.createAccessToken({
    api_key: 'a1a1b74f08e34014bf185417e009d138',
    user_api: '60f7437e-b01b-4133-b314-40545a0f5ca6',
  });

  // const basicUser = await collection.getBasicUserInfo({
  //   user_api: 'bc216ec6-7e07-4d7a-a4c6-2c847772c1b9',
  //   api_key: 'fb5230f2206b4ddb98bd325f58c885b6',
  //   accountHolderMSISDN: "242066900110"
  // });
  // console.log(basicUser)
  // await provi.createApikey()
}
main();
