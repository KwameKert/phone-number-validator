import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationService } from './services/notification.service';
import { NOTIFICATION } from './components/notification/notification.constants';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        this.notification.openSnackbar(NOTIFICATION.ERROR, err.error.info);
        console.error(err);
        return EMPTY;
      }),
      finalize(() => {})
    );
  }
}
