import { Injectable } from '@angular/core';
import {AuthLogin} from "../interfaces/auth-login";
import {HttpClient} from "@angular/common/http";
import {AuthToken} from "../interfaces/auth-token";

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
          client_id: '99be762b-6c35-455a-84e2-6691d44359b9',
          client_secret: '3cgEECpj6y6xYgsrqCq6Ga5U0ib8GO69reOilUfk',
          grant_type: 'password',
          scope: '',
    };

    return this.http.post<AuthToken>('http://127.0.0.1:8000/oauth/token',loginRequest);

  }

}
