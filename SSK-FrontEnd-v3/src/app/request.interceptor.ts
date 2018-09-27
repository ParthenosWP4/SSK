import 'rxjs/add/operator/do';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {SskServicesService} from './ssk-services.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private sskServ: SskServicesService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.sskServ.setStatusError(undefined);
    request = request.clone({
      setHeaders: {
        observe : 'response',
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json; charset=UTF-8'
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {

      }
    }, (err: any) => {
      console.log(err);
      this.sskServ.setStatusError(err.status);
      this.sskServ.checkBackEndAvailability();
    });
  }



}

