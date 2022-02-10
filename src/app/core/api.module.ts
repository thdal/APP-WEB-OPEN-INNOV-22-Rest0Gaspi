import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TokenService } from './api/oauth/token.service';
import { GandalfInterceptor } from './headers/gandalf.interceptor';
import { AuthTokenInterceptor } from './headers/auth-token.interceptor';
import { GlobalHttpErrorInterceptor } from './headers/global-http-error.interceptor';

const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: GandalfInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpErrorInterceptor, multi: true }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    TokenService,
    interceptors
  ]
})
export class ApiModule {

}
