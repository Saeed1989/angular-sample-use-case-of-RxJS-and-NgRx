import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = 'dummy-user-token';
    req.headers.set('Authorization', `${userToken}`);
    let modifiedReq = req.clone({
      headers: req.headers
        .set('Authorization', userToken)
        .set('Accept', 'application/json'),
    });
    return next.handle(modifiedReq);
  }
}
