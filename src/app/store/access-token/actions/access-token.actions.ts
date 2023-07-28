import {createAction, props} from "@ngrx/store";
import {AuthToken} from "../models/auth-token";
import {AuthTokenErrorHttp} from "../models/auth-token-error-http";


export const loadAccessToken = createAction(
  '[Load access token] load load access token',
  props<{username: string; password: string}>()
);
export const loadAccessTokenSuccess = createAction(
  '[Load access token] load access token success',
  props<{authToken: AuthToken}>()
);

export const loadAccessTokenError = createAction(
  '[Load access token] load access token error',
  props<{error: AuthTokenErrorHttp}>()
);


export  const cleanAccessTokenStore = createAction(
  '[Clean access token] Clean access token from storage'
);
