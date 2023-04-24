import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserAuthComponent } from './user-auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { VerifyComponent } from './verify/verify.component';
import { UserService } from '../service/user.service';
import { UserAuthService } from '../service/user-auth.service';

@NgModule({
  declarations: [
    UserAuthComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MdbFormsModule,
  ],
  providers: [UserService, UserAuthService],
})
export class UserAuthModule {}
