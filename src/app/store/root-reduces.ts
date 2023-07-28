import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "./interfaces/app-state";
import {authUserReducer} from "./user/reducers/auth-user.reducers";
import {accessTokenReducer} from "./access-token/reducers/access-token.reducers";


export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  userState: authUserReducer,
  authTokenState: accessTokenReducer
}
