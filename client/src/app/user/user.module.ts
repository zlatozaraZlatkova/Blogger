import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AuthFormsSectionComponent } from './auth-forms-section/auth-forms-section.component';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SingUpFormComponent } from './sing-up-form/sing-up-form.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthFormsSectionComponent,
    SingInFormComponent,
    SingUpFormComponent,
    ProfileComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule {}
