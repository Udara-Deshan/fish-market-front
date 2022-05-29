import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {ProgressSpinnerService} from "./progress-spinner.service";

@Injectable()
export class ProgressSpinnerInterceptor implements HttpInterceptor {


  constructor(public progressSpinnerService: ProgressSpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET') {
      this.progressSpinnerService.show();
    }
    return next.handle(request).pipe(
      finalize(() => this.progressSpinnerService.hide())
    );
  }
}
