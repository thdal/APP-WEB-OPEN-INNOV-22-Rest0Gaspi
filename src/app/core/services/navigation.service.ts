import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private noBackUrls: string[] = ['/login', '/products', '/fo-users', '/quizzes'];
  private history: string[] = [];
  private subject = new Subject<boolean>();

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
        this.subject.next(!this.noBackUrls.includes(event.url));
      }
    });
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  showBackBtn(): Observable<boolean> {
    return this.subject.asObservable();
  }

}
