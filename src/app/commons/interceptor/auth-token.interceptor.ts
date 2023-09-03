import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthTokenStore } from '../helpers/auth-token.store';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.isOnpremiseUrl(request.url)) {
      return next.handle(
        request.clone(
          {
            headers: this.getOnpremiseHeaders()
          }
        )
      );
    }
    return next.handle(request);
  }

  private isOnpremiseUrl(currentUrl: string) {
    return currentUrl.includes(`${environment.onpremise.baseUrl}/api`);
  }

  private getOnpremiseHeaders() {
    const authToken = AuthTokenStore.getToken();

    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', `Bearer ${authToken.access_token}`);
  }
}
