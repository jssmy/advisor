import {AuthUserState} from "../user/states/auth-user-state";
import {AuthTokenState} from "./auth-token-state";

export interface AppState {
  userState: AuthUserState;
  authTokenState: AuthTokenState
}
