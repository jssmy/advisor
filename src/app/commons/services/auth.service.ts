import { Injectable } from '@angular/core';
import {AuthLogin} from "../interfaces/auth-login";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthToken} from "../../store/access-token/models/auth-token";
import {environment} from "../../../environments/environment";
import {AuthUser} from "../../store/user/models/auth-user";
import {Observable, of, tap} from "rxjs";
import {JwtHelper} from "../helpers/jwt.helper";
import { AuthTokenStore } from '../helpers/auth-token.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
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

    return this.http.post<AuthToken>(`${environment.onpremise.baseUrl}/${environment.onpremise.path.authToken}`,loginRequest)
      .pipe(
        tap(accessToken => AuthTokenStore.setToken(accessToken))
      );
  }

  public logout() {

    const authToken = AuthTokenStore.getToken();

    const accessToken = JwtHelper.decode(authToken.access_token);

    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('X-Requested-With','XMLHttpRequest')
    //   .set('Authorization',`Bearer ${authToken.access_token}`);

    return this.http.delete(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.revokeToken}/${accessToken.jti}`);
  }
  public userConfig(): Observable<AuthUser> {
    const userConfig = localStorage.getItem('user-config');
    if(userConfig) {
      return of(JSON.parse(userConfig) as AuthUser)
    }
    // const authToken = JSON.parse(localStorage.getItem('auth-token') as string) as AuthToken;
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('X-Requested-With','XMLHttpRequest')
    //   .set('Authorization',`Bearer ${authToken.access_token}`);

    return this.http.get<AuthUser>(`${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.authUserConfig}`)
      .pipe(tap(config => localStorage.setItem('user-config', JSON.stringify(config))));
  }

}

