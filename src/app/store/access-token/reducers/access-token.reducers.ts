import { AuthTokenState } from "../../interfaces/auth-token-state";
import { createReducer, on } from "@ngrx/store";
import {
  cleanAccessTokenStore,
  loadAccessToken,
  loadAccessTokenError,
  loadAccessTokenSuccess
} from "../actions/access-token.actions";

export const initialStateAccessToken: Readonly<AuthTokenState> = {
  loading: false,
  authToken: null,
  error: null
};

export const accessTokenReducer = createReducer(
  initialStateAccessToken,
  on(loadAccessToken, (state) => ({ ...state, loading: true })),
  on(loadAccessTokenSuccess, (state, { authToken }) => ({ ...state, authToken, loading: true })),
  on(loadAccessTokenError, (state, { error }) => ({ ...state, loading: false, error: error })),
  on(cleanAccessTokenStore, (state) => ({ ...initialStateAccessToken }))
);
