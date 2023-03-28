import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  constructor(private router: Router, private authService: UserAuthService) {
    if (authService.loginStatus() !== true) {
      router.navigate(['/login']);
    }
  }
}
