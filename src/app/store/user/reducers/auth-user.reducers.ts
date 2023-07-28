import { Action, createReducer, on } from '@ngrx/store';

import {cleanAuthUserConfigStorage, loadAuthUserConfigs, loadAuthUserConfigsSuccess,} from "../action/auth-user.action";
import {AuthUserState} from "../states/auth-user-state";

export const initialStateUserAuthConfig : Readonly<AuthUserState> = {
  loading: false,
  authUserConfig: null
};

export const authUserReducer = createReducer(
  initialStateUserAuthConfig,
  on(loadAuthUserConfigs, (state) => ({...state, loading: true})),
  on(loadAuthUserConfigsSuccess, (state,{authUserConfig}) => ({authUserConfig, loading: false})),
  on(cleanAuthUserConfigStorage, (state) => ({...initialStateUserAuthConfig}))
  )
