import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
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
  isDoubleBack = false;
  moveFocus(e: any, back: any, current: any, next: any) {
    const length = current.value.length;

    if (e.key === 'Backspace') {
      if (length == 0 && back !== '') {
        back.focus();
        this.isDoubleBack = false;
      } else this.isDoubleBack = true;
    } else if (next !== '') {
      next.focus();
    }
  }
  /*moveFocus(e: any) {
    const input = e.target;
    /*const nextInput = input.nextElementSibling;
    if (nextInput && input.value) {
      //      nextInput.focus();
      if (nextInput.value) {
        //nextInput.select();
      }
    }
  }*/
  onKeydown(event: KeyboardEvent): void {
    console.log(event);
  }
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    let clipboardData = event.clipboardData || (window as any).clipboardData;
    let pastedText: string = clipboardData.getData('text');
    if (pastedText.length === 6) {
      for (let i = 0; i < 6; i++) {
        this.code[i] = pastedText[i];
      }
    } else {
      alert('Invalid code!');
    }
  }

  verify() {
    let verifyCode: string = '';
    this.verifyForm.account = this.user.catchUserAccount();
    for (let i = 0; i < 8; i++) {
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
