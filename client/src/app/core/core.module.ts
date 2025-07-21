import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { userAuthInterceptor } from './interceptors/user-auth.interceptor';
import { errorInterceptor } from './interceptors/error.interseptor';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HeroSectionComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    HeroSectionComponent,
    PageNotFoundComponent,
  ],
  providers: [
    userAuthInterceptor,
    errorInterceptor
  ]
})
export class CoreModule { }
