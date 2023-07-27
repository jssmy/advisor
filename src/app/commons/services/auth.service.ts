import { Injectable } from '@angular/core';
import {AuthLogin} from "../interfaces/auth-login";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthToken} from "../interfaces/auth-token";
import {environment} from "../../../environments/environment";
import {AuthUser} from "../interfaces/auth-user";

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
          client_id: environment.client_id,
          client_secret: environment.client_secret,
          grant_type: environment.grant_type,
          scope: '',
    };

    return this.http.post<AuthToken>(environment.authToken,loginRequest);

  }

  public userConfig() {
    const authToken = JSON.parse(sessionStorage.getItem('authToken') as string) as AuthToken;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With','XMLHttpRequest')
      .set('Authorization',`Bearer ${authToken.access_token}`);

    return this.http.get<AuthUser>(environment.authUserConfig, {headers});
  }

}
