import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      params: request.params
      ? request.params.set('key', environment.API_TOKEN)
      : new HttpParams().set('key', environment.API_TOKEN)
    })

    console.log(`Auth request:`, request.urlWithParams);

    return next.handle(request);
  }
}
