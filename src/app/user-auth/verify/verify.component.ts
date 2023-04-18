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
    this.account = this.user.catchUserAccount();
    /*if (this.account == 'null') {
      alert('Please login or register to continue!');
      this.router.navigate(['/auth']);
    }*/
    this.code = ['', '', '', '', '', '', '', ''];
  }
  isDoubleBack: boolean = false;
  moveFocus(e: any, back: any, current: any, next: any) {
    const length = current.value.length;
    console.log(e);

    if (e.key === 'Backspace') {
      if (this.isDoubleBack && back !== '') {
        back.focus();
        this.isDoubleBack = false;
      } else this.isDoubleBack = true;
    } else if (next !== '') {
      e.keytab();
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
    console.log(form);
    this.auth.verify(form).subscribe((res) => {
      console.log(res);
      alert('Verify Successful!\nPlease login again');

      let response = res;
      this.router.navigate(['/auth']);
    });
  }
}

export interface VerifyRequest {
  account: string;
  code: string;
}
