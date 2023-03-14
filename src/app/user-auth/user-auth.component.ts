import { Component } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent {
  logMode: boolean = true;
  switchMode(mode: boolean): void {
    if (mode) {
      this.logMode = true;
    } else this.logMode = false;
  }
}
