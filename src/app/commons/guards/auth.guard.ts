import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalRoutes } from "../constants/global-routes";
import { AuthTokenStore } from '../helpers/auth-token.store';
import { JwtHelper } from '../helpers/jwt.helper';
import { DateHelper } from '../helpers/date.helper';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const authToken = AuthTokenStore.getToken();

    if (!authToken) {
      return this.router.navigate([GlobalRoutes.LOGIN]);
    }

    const accessToken = JwtHelper.decode(authToken.access_token);

    const expiredTime = DateHelper.dateFromUnix(accessToken.exp);
    const isExpired = expiredTime.diff(DateHelper.current(), 'minutes') <= 0;

    if (isExpired) {
      this.authService.deleteSession();
      return this.router.navigate([GlobalRoutes.LOGIN]);
    }
    return true;
  }

}
