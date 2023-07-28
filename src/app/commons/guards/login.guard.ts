import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalRoutes} from "../constants/global-routes";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  constructor(
    private readonly  router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const can = !sessionStorage.getItem('auth-token');
    if(!can) {
      return this.router.navigate([GlobalRoutes.PAGE, GlobalRoutes.DASHBOARD]);
    }
    return  can;
  }

}
