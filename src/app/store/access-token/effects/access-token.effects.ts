import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {AuthService} from "../../../commons/services/auth.service";
import {loadAccessToken, loadAccessTokenError, loadAccessTokenSuccess} from "../actions/access-token.actions";
import {EMPTY, of, throwError} from "rxjs";


@Injectable()
export class  AccessTokenEffects {
  constructor(
    private actions$: Actions,
    private readonly authService: AuthService
  ) {}

  loadAccessToken$ = createEffect(() => this.actions$.pipe(
      ofType(loadAccessToken),
      exhaustMap(({password, username}) => this.authService.login(username, password)
        .pipe(
          map(authToken => (loadAccessTokenSuccess({authToken}))),
          catchError((error: any) => of(null).pipe(
            map(() => (loadAccessTokenError({error})))
          ))

        )
      )
    )
  );


}
