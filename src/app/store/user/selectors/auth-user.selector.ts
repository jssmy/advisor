import { createSelector } from '@ngrx/store';
import {AppState} from "../../interfaces/app-state";
import {AuthUserState} from "../states/auth-user-state";

export const selectAuthUserConfigFeature = (state: AppState) => state.userState;

export const selectAuthUserConfig = createSelector(
  selectAuthUserConfigFeature,
  (state: AuthUserState) => state.authUserConfig
);

export const selectAuthUserConfigLoadig = createSelector(
  selectAuthUserConfigFeature,
  (state : AuthUserState) => state.loading
);

