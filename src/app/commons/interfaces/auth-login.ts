import {GrantType} from "../constants/grant-type";

export interface AuthLogin {
  grant_type: GrantType;
  client_id:  string;
  client_secret: string;
  username: string;
  password: string,
  scope: string;
}
