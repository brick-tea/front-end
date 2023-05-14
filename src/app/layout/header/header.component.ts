import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { DataService } from 'src/app/service/data.service';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private authService: UserAuthService,
    private router: Router,
    private dataService: DataService,
    private searchService: SearchService,
    private user: UserService
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
  searchType: string[] = ['Product', 'Post'];
  searchArea: string = 'product';
  searchTags: string[] = [];
  BEAM_COLORS = '3b3e37,e19563,066699,d39088,f0ddB5'; // avatar colors set
  /// display personal information
  account: string = this.user.catchUserAccount();
  menuController() {}
  isSearch: boolean = false;
  onSearch(search: HTMLInputElement) {
    this.isSearch = true;
    const options: NavigationExtras = {
      queryParams: {
        onSearch: true,
      },
      skipLocationChange: true,
    };
    this.router.navigate(['/home/products'], options);
    if (this.searchArea === 'product') {
      this.searchService.productSearch(search.value)?.subscribe(
        (res) => {
          console.log(res);
          this.dataService.setProductResults(res);
        },
        (err) => {},
        () => (this.isSearch = false)
      );
    } else if (this.searchArea === 'post') {
    }
  }
  selectOption(option: string) {
    this.searchArea = option;
  }
}
