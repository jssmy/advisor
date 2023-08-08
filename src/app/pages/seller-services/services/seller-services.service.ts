import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AuthToken} from "../../../store/access-token/models/auth-token";
import {tap} from "rxjs";
import {SellerServices} from "../interfaces/seller-services";

@Injectable({
  providedIn: 'root'
})
export class SellerServicesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getServices() {
    const authToken = JSON.parse(localStorage.getItem('auth-token') as string) as AuthToken;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With','XMLHttpRequest')
      .set('Authorization',`Bearer ${authToken.access_token}`);

    return this.http.get<SellerServices[]>(environment.sellerServices, {headers})
      .pipe(
        tap()
      );
  }
}
