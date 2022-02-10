import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token } from '../../models/token';
import { TokenStorageService } from '../../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private oauthUri = '/admin/tokens';

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  authentication(params: {login: string, password: string}): Observable<Token> {
    return this.httpClient
      .post(environment.apiUrl + this.oauthUri, params)
      .pipe(map(data => data as Token), catchError((err: any) => err.code === 404 ? [] : throwError(err)));
  }

  public isLoggedIn(): boolean {
    let token = this.tokenStorage.getToken();
    if (token == null) {
      return false;
    }
    return moment().isBefore(token.authExpireAt);
  }

}
