import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/service/user-auth.service';

const MAIL_POSFIX = 'gms.ndhu.edu.tw';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  @Output() toLog = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,

    private auth: UserAuthService
  ) {}
  isSend: boolean = false;
  verifyMode = 'forgot';

  form = this.formBuilder.group({
    account: [
      null,
      [Validators.required, Validators.pattern('[46][0-9]{3}[0-9A-Z]{5}')],
    ],
  });
  sending: boolean = false;
  sendMail() {
    this.sending = true;
    const email: string = this.form.value.account + '@' + MAIL_POSFIX;
    console.log(email);
    this.auth.sendForgotMail(email, this.form.value.account!).subscribe(
      (res) => {
        this.isSend = true;
        alert('驗證信已送出\n' + '到 ' + email + ' 查看驗證碼');
      },

      (err) => {
        alert('Something went wrong');
        console.log(err);
      }
    );
  }
}
