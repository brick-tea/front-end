import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() toLog = new EventEmitter();
  signUpForm = this.formBuilder.group({
    account: [
      null,
      [Validators.required, Validators.pattern('[46][0-9]{3}[0-9A-Z]{5}')],
    ],
    password: [null, [Validators.required, Validators.minLength(6)]],
    nickname: [null, [Validators.required, Validators.maxLength(30)]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: UserAuthService
  ) {}

  token: string = '';
  signup() {
    console.log(this.signUpForm.value);
    this.auth.register(this.signUpForm.value).subscribe(
      (res) => {
        alert(
          'Register successful\n' +
            'check ' +
            this.signUpForm.value.account +
            '@gms.ndhu.edt.tw' +
            ' to verify !'
        );
        this.signUpForm.reset();
        this.router.navigate(['auth/verify']);
      },

      (err) => {
        alert('Something went wrong');
        console.log(err);
      }
    );
  }
}
