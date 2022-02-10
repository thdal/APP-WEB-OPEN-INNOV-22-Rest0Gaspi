import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar, private translate: TranslateService) { }

  config: MatSnackBarConfig = {
    duration: 1500
  }

  success(msg?: string): void {
    this.config['panelClass'] = ['snack-success'];
    const message = msg == null ? this.translate.instant('ws.success') : msg;
    this.snackBar.open(message,'', this.config);
  }

  error(msg?: string): void {
    this.config['panelClass'] = ['snack-error'];
    const message = msg == null ? this.translate.instant('ws.error') : msg;
    this.snackBar.open(message, '', this.config);
  }

  badLogin(): void {
    this.config['panelClass'] = ['snack-error'];
    const message = this.translate.instant('ws.badLogin');
    this.snackBar.open(message, '', this.config);
  }

  nyi(msg?: string): void {
    const message = msg == null ? this.translate.instant('dev.nyi') : msg;
    this.snackBar.open(message, '', this.config);
  }

}
