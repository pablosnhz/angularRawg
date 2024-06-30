import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentTmdb } from 'src/environments/environment';

@Injectable()
export class TmdbInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers = request.headers
      .set('Authorization', `Bearer ${environmentTmdb.API_TOKENBD}`)
      .set('Content-Type', 'application/json');
    const modifiedRequest = request.clone({ headers: headers });

    return next.handle(modifiedRequest);
  }
}
