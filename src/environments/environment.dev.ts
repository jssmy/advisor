import {GrantType} from "../app/commons/constants/grant-type";

export const environment = {
  authToken: 'http://127.0.0.1:8000/oauth/token',
  revokeToken: 'http://127.0.0.1:8000/api/v1/access/token',
  authUserConfig: 'http://127.0.0.1:8000/api/v1/user/config',
  client_id: '99be762b-6c35-455a-84e2-6691d44359b9',
  client_secret: '3cgEECpj6y6xYgsrqCq6Ga5U0ib8GO69reOilUfk',
  grant_type: 'password' as GrantType
};
