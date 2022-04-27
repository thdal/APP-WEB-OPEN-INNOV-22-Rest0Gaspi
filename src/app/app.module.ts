import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/user/Pages/login/login.component';
import { RegisterComponent } from './Components/user/Pages/register/register.component';
import { AppRoutingModule } from './app-routing.module';

import {ShareButtonsModule} from "ngx-sharebuttons/buttons";
import {ShareIconsModule} from "ngx-sharebuttons/icons";

import { ToastrModule } from 'ngx-toastr';

// services
import { InterceptorService } from './_services/interceptor.service';
import { UserService } from './_services/user.service';
import { MenuTopComponent } from './Components/menu/menu-top/menu-top.component';
import { MenuLeftComponent } from './Components/menu/menu-left/menu-left.component';
import { MenuRestauListComponent } from './Components/menu-restau/Composants/menu-restau-list/menu-restau-list.component';
import {JwPaginationModule} from "jw-angular-pagination";
import { AddMenuRestauComponent } from './Components/menu-restau/Pages/add-menu-restau/add-menu-restau.component';
import { MenuRestauFormComponent } from './Components/menu-restau/Composants/menu-restau-form/menu-restau-form.component';
import { MyMenuRestauComponent } from './Components/menu-restau/Pages/my-menu-restau/my-menu-restau.component';
import { SetMenuRestauComponent } from './Components/menu-restau/Pages/set-menu-restau/set-menu-restau.component';
import { ShowMenuRestauComponent } from './Components/menu-restau/Pages/show-menu-restau/show-menu-restau.component';
import { MenuRestauViewComponent } from './Components/menu-restau/Composants/menu-restau-view/menu-restau-view.component';
import { MenuRestauPaginationComponent } from './Components/menu-restau/Composants/menu-restau-pagination/menu-restau-pagination.component';
import { ProfileFormComponent } from './Components/user/Composants/profile-form/profile-form.component';
import { EditUserProfileComponent } from './Components/user/Pages/edit-user-profile/edit-user-profile.component';
import { UsersListComponent } from './Components/user/Composants/users-list/users-list.component';
import { UserAdministrationComponent } from './Components/user/Pages/user-administration/user-administration.component';
import { MenuRestauNotFoundComponent } from './Components/menu-restau/Composants/menu-restau-not-found/menu-restau-not-found.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PrivacyPolicyComponent } from './Components/resources/Pages/privacy-policy/privacy-policy.component';
import { LegalNoticesComponent } from './Components/resources/Pages/legal-notices/legal-notices.component';
import { CguComponent } from './Components/resources/Pages/cgu/cgu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MenuTopComponent,
    MenuLeftComponent,
    MenuRestauListComponent,
    AddMenuRestauComponent,
    MenuRestauFormComponent,
    MyMenuRestauComponent,
    SetMenuRestauComponent,
    ShowMenuRestauComponent,
    MenuRestauViewComponent,
    MenuRestauPaginationComponent,
    ProfileFormComponent,
    EditUserProfileComponent,
    UsersListComponent,
    UserAdministrationComponent,
    MenuRestauNotFoundComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    LegalNoticesComponent,
    CguComponent,
  ],
  imports: [
    JwPaginationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ShareButtonsModule.withConfig({
      debug:true,
    }),
    ShareIconsModule,
  ],
  providers: [DatePipe, UserService,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}], //
  bootstrap: [AppComponent]
})
export class AppModule { }






