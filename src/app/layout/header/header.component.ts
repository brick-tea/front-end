import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { DataService } from 'src/app/service/data.service';
import { SearchService } from 'src/app/service/search.service';

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
    private searchService: SearchService
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
  searchType: string[] = ['Product', 'Post'];
  searchArea: string = 'product';
  searchTags: string[] = [];
  menuController() {}
  isSearch: boolean = false;
  onSearch(search: HTMLInputElement) {
    if (this.searchArea === 'product') {
      this.searchService
        .productSearch(search.value)
        ?.subscribe((res) => console.log(res));
    } else if (this.searchArea === 'post') {
    }
  }
  selectOption(option: string) {
    this.searchArea = option;
  }
}
