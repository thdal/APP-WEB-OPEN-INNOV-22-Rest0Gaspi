import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogoutDlgComponent } from 'src/app/shared/dialog/logout/logout-dlg.component';
import { TokenStorageService } from '../services/token-storage.service';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  private dlgRef: MatDialogRef<any> | null = null;

  constructor(private token: TokenStorageService, public dialog: MatDialog, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.token.getToken();
    if (token != null) {
      authReq = request.clone({ headers: request.headers.set('Authorization', token.authToken) });
    }

    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error.status === 401 && this.dlgRef === null) {
            this.dlgRef = this.dialog.open(LogoutDlgComponent, { height: '200px', width: '300px' });
            this.dlgRef.afterClosed().subscribe(() => {
              this.token.signOut();
              this.dlgRef = null;
            });
            return of(error);
        }
        return throwError(error);
      })
    );
  }
}
