import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  UserAuthService,
  resetForm,
  resetResponse,
} from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

const codeLength = 6;
const MAIL_POSFIX = 'gms.ndhu.edu.tw';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: UserAuthService,
    private user: UserService,
    private fb: FormBuilder
  ) {}
  @Input() verifyMode: boolean = false;
  resetForm?: FormGroup;

  ngOnInit(): void {
    this.account = this.user.catchUserAccount();
    if (this.account == 'null') {
      alert('無帳號資料，請先登入。');
      this.router.navigate(['/auth']);
    }
    this.code = ['', '', '', '', '', ''];
    console.log('verifyForm');
    this.resetForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      passwordCheck: [
        '',
        [
          Validators.required,
          this.confirmValidator(),
          // this.brustValidator(),
        ],
      ],
    });
    console.log('InitEnd!');
  }

  get password(): AbstractControl | null {
    return this.resetForm?.get('password') || null;
  }
  get passwordCheck(): AbstractControl | null {
    return this.resetForm?.get('passwordCheck') || null;
  }

  confirmValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const rePassword: string = control.value;
      const oriPassword: string = this.password?.value;
      if (rePassword !== oriPassword) return { misMatch: true };
      else return null;
    };
  }
  brustValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const rePassword: string = control.value;
      if (rePassword === '487633') return { tooBrust: true };
      else return null;
    };
  }

  code!: string[];
  account!: string;

  verifyForm: VerifyRequest = {
    account: '',
    code: '',
  };

  valLimit(e: KeyboardEvent): boolean {
    e.stopImmediatePropagation();
    const keyval =
      (e.key >= 'a' && e.key <= 'z') ||
      (e.key >= 'A' && e.key <= 'Z') ||
      (e.key >= '0' && e.key <= '9');
    console.log('keyValue: ' + keyval);
    if (!keyval) {
      e.preventDefault;
      console.log('hi');
      return false;
    }
    return true;
  }

  isDoubleBack = false;
  moveFocus(e: any, back: any, current: any, next: any) {
    e.preventDefault();

    const keyval =
      (e.key >= 'a' && e.key <= 'z') ||
      (e.key >= 'A' && e.key <= 'Z') ||
      (e.key >= '0' && e.key <= '9');

    const length = current.value.length;

    if (e.key === 'Backspace') {
      if (length === 0 && back !== '') {
        back.focus();
      }
    } else if (keyval && next !== '') {
      next.focus();
    }
  }

  onPaste(event: any) {
    event.preventDefault();
    let clipboardData = event.clipboardData || (window as any).clipboardData;
    let pastedText: string = clipboardData.getData('text');
    if (pastedText.length === codeLength) {
      for (let i = 0; i < codeLength; i++) {
        this.code[i] = pastedText[i];
      }
    } else {
      alert('貼上格式錯誤！');
    }
  }

  verify() {
    let verifyCode: string = '';
    this.verifyForm.account = this.user.catchUserAccount();
    for (let i = 0; i < codeLength; i++) {
      verifyCode = verifyCode + this.code[i];
    }
    this.verifyForm.code = verifyCode;
    let form = JSON.stringify(this.verifyForm);
    form = JSON.parse(form);
    this.auth.verify(form).subscribe((res) => {
      console.log(res);
      alert('Verify Successful!\nPlease login again');
      this.router.navigate(['/auth']);
    });
  }
  resetPassword() {
    let verifyCode: string = '';
    this.verifyForm.account = this.user.catchUserAccount();
    for (let i = 0; i < codeLength; i++) {
      verifyCode = verifyCode + this.code[i];
    }

    const resetForm: resetForm = {
      email: this.user.catchUserAccount() + '@' + MAIL_POSFIX,
      newPassword: this.password?.value,
      code: verifyCode,
    };
    this.auth.verifyForgot(resetForm).subscribe(
      (res: resetResponse) => {
        console.log(res.status);
        alert('密碼成功變更，請重新登入');
        this.router.navigate(['/auth']);
      },
      (err) => console.log(err)
    );
  }
}

export interface VerifyRequest {
  account: string;
  code: string;
}
