import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { MainComponent } from './main/main.component';
import { UserModule } from './user/user.module';
import { AuthenticateComponent } from './authenticate/authenticate.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthenticateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    UserModule,
    FeaturesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
