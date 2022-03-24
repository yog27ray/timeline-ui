import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TimelineModule } from './timeline/timeline.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { LoginModule } from './login/login.module';
import { routes } from './app.routes';
import { SocialAuthServiceProvider } from '../providers/social-auth/social-auth-service-config';
import { ConnectionService } from '../providers/connection-service';
import { BroadcastService } from '../providers/broadcast-service';
import { AppConfig } from '../providers/app-config/app-config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes, {}),
    BrowserModule,
    TimelineModule,
    LoginModule,
    RouterModule.forRoot([]),
    NavbarModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AppConfig,
    SocialAuthServiceProvider,
    ConnectionService,
    BroadcastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
