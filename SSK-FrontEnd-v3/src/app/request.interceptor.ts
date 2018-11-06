import 'rxjs/add/operator/do';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Injectable, Injector} from '@angular/core';
import {SskService} from './ssk.service';



@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private sskServ;
  constructor(inj: Injector ,
             ) {
              this.sskServ = new SskService(null, null, null, null);
             }

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
      this.sskServ.setStatusError(err.status);
      this.sskServ.checkBackEndAvailability();
    });
  }



}

