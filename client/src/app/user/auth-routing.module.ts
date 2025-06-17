import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthFormsSectionComponent } from './auth-forms-section/auth-forms-section.component';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SingUpFormComponent } from './sing-up-form/sing-up-form.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GuestGuard } from '../shared/guards/guest.guard';


const routes: Routes = [
  {
    path: '',
    component: AuthFormsSectionComponent,
    children: [
      {
        path: 'login',
        component: SingInFormComponent,
        canActivate: [GuestGuard],
        data: {
          title: 'Login',
          layout: 'auth',
          showHeader: false,
          showFooter: false,
        },
      },
      {
        path: 'register',
        component: SingUpFormComponent,
        canActivate: [GuestGuard],
        data: {
          title: 'Register',
          layout: 'auth',
          showHeader: false,
          showFooter: false,
        },
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Logout',
      layout: 'default',
      showHeader: true,
      showFooter: true,
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: "User's Profile",
      layout: 'default',
      showHeader: true,
      showFooter: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
