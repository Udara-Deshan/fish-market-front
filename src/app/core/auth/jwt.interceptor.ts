import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(environment.baseUrl)||!(request.url===environment.authUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.getCurrentUser?.token}`
        }
      });
    }
    return next.handle(request);
  }
}
