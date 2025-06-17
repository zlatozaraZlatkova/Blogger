import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthFormsSectionComponent } from './auth-forms-section/auth-forms-section.component';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SingUpFormComponent } from './sing-up-form/sing-up-form.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: AuthFormsSectionComponent,
    children: [
      {
        path: 'login',
        component: SingInFormComponent,
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
    data: {
      title: 'User\'s Profile',
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
export class AuthRoutingModule { }
