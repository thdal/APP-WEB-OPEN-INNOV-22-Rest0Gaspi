import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

/**Components */
import { LoginComponent } from './Components/user/Pages/login/login.component';
import { RegisterComponent } from './Components/user/Pages/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import {AddMenuRestauComponent} from "./Components/menu-restau/Pages/add-menu-restau/add-menu-restau.component";
import {MyMenuRestauComponent} from "./Components/menu-restau/Pages/my-menu-restau/my-menu-restau.component";
import {SetMenuRestauComponent} from "./Components/menu-restau/Pages/set-menu-restau/set-menu-restau.component";
import {ShowMenuRestauComponent} from "./Components/menu-restau/Pages/show-menu-restau/show-menu-restau.component";
import {EditUserProfileComponent} from "./Components/user/Pages/edit-user-profile/edit-user-profile.component";
import {UserAdministrationComponent} from "./Components/user/Pages/user-administration/user-administration.component";
import {PrivacyPolicyComponent} from "./Components/resources/Pages/privacy-policy/privacy-policy.component";
import {LegalNoticesComponent} from "./Components/resources/Pages/legal-notices/legal-notices.component";
import {CguComponent} from "./Components/resources/Pages/cgu/cgu.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cgu',
    component: CguComponent
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'legalNotices',
    component: LegalNoticesComponent
  },
  {
    path: 'addAnEvent',
    component: AddMenuRestauComponent
  },
  {
    path: 'manageUsers',
    component: UserAdministrationComponent
  },
  {
    path: 'editProfile/:userId',
    component: EditUserProfileComponent
  },
  {
    path: 'eventsList/:userId',
    component: MyMenuRestauComponent
  },
  {
    path: 'setEvent/:eventId',
    component: SetMenuRestauComponent
  },
  {
    path: 'showEvent/:eventId',
    component: ShowMenuRestauComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
