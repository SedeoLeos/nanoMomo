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
  const collection = new Colloction(
    "https://sandbox.momodeveloper.mtn.com/collection",
    subriction_id,
    "sandbox",
    callbackhost
  );
  const result = await collection.createAccessToken({
    api_key: apikey.apikey,
    user_api: userApi.userApi,
  });
  console.log(result);
  // await provi.createApikey()
}
// main();
