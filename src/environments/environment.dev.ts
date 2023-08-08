import {GrantType} from "../app/commons/constants/grant-type";

export const environment = {
  authToken: 'http://127.0.0.1:8000/oauth/token',
  revokeToken: 'http://127.0.0.1:8000/api/v1/access/token',
  authUserConfig: 'http://127.0.0.1:8000/api/v1/user/config',
  sellerServices: 'http://127.0.0.1:8000/api/v1/seller-services',
  client_id: '99ca8602-0115-4b83-896e-893f0520e555',
  client_secret: '8JSmdKVO5iM15rbOxPLejihiLNAyzrvU6XuBBLWQ',
  grant_type: 'password' as GrantType
};
