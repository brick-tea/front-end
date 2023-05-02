import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { ProductService, ProductInfo } from 'src/app/service/product.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  constructor(
    private router: Router,
    private authService: UserAuthService,
    private productService: ProductService
  ) {
    if (authService.loginStatus() !== true) {
      router.navigate(['/login']);
    }
  }

  allProducts$: Observable<ProductInfo[]> =
    this.productService.getAllProducts();
  loadProductList() {
    this.productService.getAllProducts().subscribe((res) => console.log(res));
  }
}
