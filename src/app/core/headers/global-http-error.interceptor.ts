import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Injectable()
export class GlobalHttpErrorInterceptor implements HttpInterceptor {

  private STATUSES_TRIGGERRED: number[] = [500, 501, 502, 503, 400, 403, 404, 422];

  constructor(private snackService: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (this.STATUSES_TRIGGERRED.includes(error.status)) {
            this.snackService.error();
          }

          return throwError(error);
        })
      );
  }
}
