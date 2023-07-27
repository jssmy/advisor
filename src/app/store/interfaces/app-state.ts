import {AuthUserState} from "./auth-user-state";
import {AuthTokenState} from "./auth-token-state";

export interface AppState {
  authTokenState: AuthTokenState;
  userState: AuthUserState;
}
