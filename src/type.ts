export type PlayloadAccessToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
export type PlayloadOauth2 = PlayloadAccessToken & {
  scope: string;
  refresh_token: string;
  refresh_token_expired_in: number;
};
export type Payer = {
  partyIdType: string;
  partyId: string;
};
export type ErrorReason = {
  code: string;
  message: string;
};
export type PlayloadRequestToPayResult = {
  amount: string;
  currency: string;
  financialTransactionId: string;
  externalid: string;
  payer: Payer;
  payerMessage: string;
  payeeNote: string;
  status: string;
  reason: ErrorReason;
};
export type PlayloadUserinfoWithConsent = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  middle_name: string;
  email: string;
  email_verified: true;
  gender: string;
  locale: string;
  phone_number: string;
  phone_number_verified: true;
  address: string;
  updated_at: 0;
  status: string;
  birthdate: string;
  credit_score: string;
  active: true;
  country_of_birth: string;
  region_of_birth: string;
  city_of_birth: string;
  occupation: string;
  employer_name: string;
  identification_type: string;
  identification_value: string;
};
export type PlayloadRequestTopay = {
  amount: string;
  currency: string;
  externalId: string;
  paye: Payer;
  payerMessage: string;
  payeeNote: string;
};
export type PlayloadUserInfo = {
  given_name: string;
  family_name: string;
  birthdate: string;
  locale: string;
  gender: string;
  status: string;
};
export type PlayloadBcauthorizeResponse = {
  auth_req_id: string;
  interval: string;
  expires_in: string;
};
