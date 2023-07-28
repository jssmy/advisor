import { createAction, props } from '@ngrx/store';
import {AuthUser} from "../models/auth-user";

export const loadAuthUserConfigs = createAction(
  '[Load AuthConfig] Load user configurations',
);

export const loadAuthUserConfigsSuccess = createAction(
  '[Load AuthConfig] Load user configurations success',
  props<{authUserConfig: AuthUser}>()
);

export const cleanAuthUserConfigStorage = createAction(
  '[Clean auth user config] Clean auth user config from storage'
);
