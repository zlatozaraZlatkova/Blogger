import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AuthFormsSectionComponent } from './auth-forms-section/auth-forms-section.component';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SingUpFormComponent } from './sing-up-form/sing-up-form.component';

@NgModule({
  declarations: [
    AuthFormsSectionComponent,
    SingInFormComponent,
    SingUpFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AuthFormsSectionComponent
  ],
})
export class UserModule {}
