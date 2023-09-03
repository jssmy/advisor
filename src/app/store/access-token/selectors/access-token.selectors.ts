import { AppState } from "../../interfaces/app-state";
import { createSelector } from "@ngrx/store";
import { AuthTokenState } from "../../interfaces/auth-token-state";

export const selectAccessTokenFeature = (state: AppState) => state.authTokenState;

export const selectAccessToken = createSelector(
  selectAccessTokenFeature,
  (state: AuthTokenState) => state.authToken
);

export const selectAccessTokenLoading = createSelector(
  selectAccessTokenFeature,
  (state: AuthTokenState) => state.loading
);

export const selectAccessTokenError = createSelector(
  selectAccessTokenFeature,
  (state: AuthTokenState) => state.error
);
