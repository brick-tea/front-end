import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserAuthComponent } from './user-auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { JwtModule } from '@auth0/angular-jwt';
import { VerifyComponent } from './verify/verify.component';
import { UserService } from '../service/user.service';
import { UserAuthService } from '../service/user-auth.service';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    UserAuthComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://192.168.194.45:8080'],
        /*disallowedRoutes: ['http://example.com/examplebadroute/'],*/
      },
    }),
    UserAuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MdbFormsModule,
  ],
  providers: [UserService, UserAuthService],
})
export class UserAuthModule {}
