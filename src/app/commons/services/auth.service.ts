import { Injectable } from '@angular/core';
import {AuthLogin} from "../interfaces/auth-login";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthToken} from "../../store/access-token/models/auth-token";
import {environment} from "../../../environments/environment";
import {AuthUser} from "../../store/user/models/auth-user";
import {Observable, of, tap} from "rxjs";
import {JwtHelper} from "../helpers/jwt.helper";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login(username: string, password: string) {
    const authToken = sessionStorage.getItem('auth-token');

    if(authToken) {
      return of(JSON.parse(authToken) as AuthToken);
    }

    const loginRequest: AuthLogin = {
          password,
          username,
          client_id: environment.client_id,
          client_secret: environment.client_secret,
          grant_type: environment.grant_type,
          scope: '',
    };

    return this.http.post<AuthToken>(environment.authToken,loginRequest)
      .pipe(
        tap(accessToken => sessionStorage.setItem('auth-token', JSON.stringify(accessToken)))
      );
  }

  public logout() {

    const authToken: AuthToken = JSON.parse(sessionStorage.getItem('auth-token') as string) as AuthToken;

    const accessToken = JwtHelper.decode(authToken.access_token);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With','XMLHttpRequest')
      .set('Authorization',`Bearer ${authToken.access_token}`);

    return this.http.delete(`${environment.revokeToken}/${accessToken.jti}`, {headers});
  }
  public userConfig(): Observable<AuthUser> {
    const userConfig = sessionStorage.getItem('user-config');
    if(userConfig) {
      return of(JSON.parse(userConfig) as AuthUser)
    }
    const authToken = JSON.parse(sessionStorage.getItem('auth-token') as string) as AuthToken;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With','XMLHttpRequest')
      .set('Authorization',`Bearer ${authToken.access_token}`);

    return this.http.get<AuthUser>(environment.authUserConfig, {headers})
      .pipe(tap(config => sessionStorage.setItem('user-config', JSON.stringify(config))));
  }

}

