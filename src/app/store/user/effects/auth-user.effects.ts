import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {AuthService} from "../../../commons/services/auth.service";
import {loadAuthUserConfigs, loadAuthUserConfigsSuccess} from "../action/auth-user.action";


@Injectable()
export class AuthUserEffects {
  constructor(
    private actions$: Actions,
    private readonly authService: AuthService
  ) {}

  loadAuthUserConfig$ = createEffect(() => this.actions$.pipe(
      ofType(loadAuthUserConfigs),
      exhaustMap(() => this.authService.userConfig()
        .pipe(
          map(authUserConfig => (loadAuthUserConfigsSuccess({authUserConfig}))),
          catchError(() => EMPTY)
        ))
    )
  );


}
