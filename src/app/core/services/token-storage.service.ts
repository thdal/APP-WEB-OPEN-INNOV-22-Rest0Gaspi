import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Token } from '../models/token';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private subject = new Subject<boolean>();

  constructor(private router: Router) { }

  public signOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/home']);
    this.subject.next(false);
  }

  public saveToken(token: Token): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    this.subject.next(true);
  }

  public getToken(): Token | null {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (token) {
      return JSON.parse(token);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    let token = this.getToken();
    if (token == null || this.isAnExpiredToken(token)) {
      this.subject.next(false);
      return false;
    }
    this.subject.next(true);
    return true;
  }

  public getTokenState(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public isAnExpiredToken(token: Token | null){
    var dateTimeNow = new Date();
    if(token!.authExpireAt < dateTimeNow.toISOString()){
      return true;
    }
    return false;
  }

  /*public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }*/
}
