import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {filter, Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/interfaces/app-state";
import {selectAccessToken} from "../../store/access-token/selectors/access-token.selectors";
import {map} from "rxjs/operators";
import {loadAccessToken} from "../../store/access-token/actions/access-token.actions";
import {GlobalRoutes} from "../constants/global-routes";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private readonly router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const can = !!sessionStorage.getItem('auth-token');
    if(!can) {
      return  this.router.navigate([GlobalRoutes.LOGIN]);
    }
    return can;
  }

}
