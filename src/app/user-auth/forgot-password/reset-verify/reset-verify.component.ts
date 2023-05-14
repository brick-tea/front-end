import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
const codeLength = 6;

@Component({
  selector: 'app-reset-verify',
  templateUrl: './reset-verify.component.html',
  styleUrls: ['./reset-verify.component.scss'],
})
export class ResetVerifyComponent {
  constructor(
    private router: Router,
    private auth: UserAuthService,
    private user: UserService
  ) {}

  code!: string[];
  account!: string;

  verifyForm: VerifyRequest = {
    account: '',
    code: '',
  };

  ngOnInit(): void {
    console.log('verifyForm');
    this.account = this.user.catchUserAccount();
    if (this.account == 'null') {
      alert('無帳號資料，請先登入。');
      this.router.navigate(['/auth']);
    }
    this.code = ['', '', '', '', '', ''];
  }
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
        back.value = '';
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
}

export interface VerifyRequest {
  account: string;
  code: string;
}
