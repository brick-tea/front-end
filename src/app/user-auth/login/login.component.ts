import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/user-auth.service';
import { UserStorageService } from '../../service/user-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() toReg = new EventEmitter<void>();
  loginForm = this.formBuilder.group({
    account: [
      null,
      [Validators.required, Validators.pattern('[46][0-9]{3}[0-9A-Z]{5}')],
    ],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: UserAuthService,
    private storageService: UserStorageService
  ) {}

  token: string = '';
  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        alert('SIGNIN SUCCESSFUL');
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['/home']);
        console.log(res);
      },
      (err) => {
        console.log(err);
        if (err.status === 0) {
          alert('Server No Response');
        } else if (err.status === 401) {
          alert('account not exist or wrong password');
        } else alert('Unknown Error');
      }
    );
  }
}
