import { Injectable } from '@angular/core';
import { AuthLogin } from "../interfaces/auth-login";
import { HttpClient } from "@angular/common/http";
import { AuthToken } from "../../store/access-token/models/auth-token";
import { environment } from "../../../environments/environment";
import { AuthUser } from "../../store/user/models/auth-user";
import { Observable, of, tap } from "rxjs";
import { JwtHelper } from "../helpers/jwt.helper";
import { AuthTokenStore } from '../helpers/auth-token.store';
import { AppState } from 'src/app/store/interfaces/app-state';
import { Store } from '@ngrx/store';
import { cleanAccessTokenStore } from 'src/app/store/access-token/actions/access-token.actions';
import { cleanAuthUserConfigStorage } from 'src/app/store/user/action/auth-user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private readonly store: Store<AppState>,
  ) { }

  public login(username: string, password: string) {
    const loginRequest: AuthLogin = {
      password,
      username,
      client_id: environment.onpremise.cliente_id,
      client_secret: environment.onpremise.client_secret,
      grant_type: environment.onpremise.grant_type,
      scope: '',
    };

    return this.http.post<AuthToken>(`${environment.onpremise.baseUrl}/${environment.onpremise.path.authToken}`, loginRequest)
      .pipe(
        tap(accessToken => AuthTokenStore.setToken(accessToken))
      );
  }

  public logout() {

    const authToken = AuthTokenStore.getToken();

    const accessToken = JwtHelper.decode(authToken.access_token);

    return this.http.delete(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.revokeToken}/${accessToken.jti}`);
  }

  deleteSession() {
    localStorage.clear();
    sessionStorage.clear();
    this.store.dispatch(cleanAccessTokenStore());
    this.store.dispatch(cleanAuthUserConfigStorage());

  }

  public userConfig(): Observable<AuthUser> {
    const userConfig = localStorage.getItem('user-config');

    if (userConfig) {
      return of(JSON.parse(userConfig) as AuthUser)
    }

    return this.http.get<AuthUser>(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.authUserConfig}`)
      .pipe(tap(config => localStorage.setItem('user-config', JSON.stringify(config))));
  }

}

