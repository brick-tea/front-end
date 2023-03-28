import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private authServive: UserAuthService) {}
  ngOnInit(): void {
    if (this.authServive.loginStatus() !== true) {
      console.log('Login' + this.authServive.loginStatus());
      this.router.navigate(['/auth']);
    }
  }
}
