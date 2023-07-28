import {AuthUser} from "../models/auth-user";

export interface AuthUserState {
  loading: boolean;
  authUserConfig?: AuthUser | null
}
