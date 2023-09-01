import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  
  excludeURL = [
    `${environment.onpremise.baseUrl}/${environment.onpremise.path.V1.stationRecoveryBatch}`
  ];

  countRequest = 0;

  constructor(
    private loader: LoaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.excludeURL.some(url => request.url.includes(url))) {
        console.log('loading...')
        this.countRequest = this.countRequest  + 1;
        this.loader.enabled();
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.countRequest = this.countRequest - 1;
        if(this.countRequest <= 0) {
          console.log('loaded...');
          this.loader.disabled();
          this.countRequest = 0;
        }
      })
    );
  }
}
