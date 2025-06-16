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
    children: [
      {
        path: '',
        component: AuthFormsSectionComponent,
        children: [
          { path: 'login', component: SingInFormComponent },
          { path: 'register', component: SingUpFormComponent },
          { path: '', redirectTo: 'login', pathMatch: 'full' },
        ],
      },
      { path: 'logout', component: LogoutComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
   imports: [RouterModule.forChild(routes)], 
   exports: [RouterModule]
})
export class AuthRoutingModule {}
