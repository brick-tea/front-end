import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ProductService, ProductInfo, ProductTag } from './product.service';
import { PostsService } from './posts.service';

const SEARCH_API = 'https://thebrickteam.com/search/';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private productService: ProductService,
    private postsService: PostsService
  ) {}

  // tagSearchTag(): Observable<ProductInfo[]> {}

  // search/product?q=if%20there%20is%20a%20product&tag=tag_A&tag=tag_B
  productSearch(content: string, tags: string[]): Observable<ProductInfo[]> {
    /// query for content
    content = content.trim();
    const words = content.split(' ');
    let contentQuery: string = 'q=';
    for (let i = 0; i < words.length - 1; i++) {
      contentQuery += words[i] + '+';
    }
    contentQuery += words[words.length];

    /// query for tag
    let tagQuery: string = '';
    for (let i = 0; i < tags.length; i++) {
      tagQuery += '&tag=' + tags[i];
    }

    return this.http.get<ProductInfo[]>(
      SEARCH_API + 'product?' + contentQuery + tagQuery,
      this.apiService.getHeader('json')
    );
  }

  private parseSearchString(content: string): string {
    let query: string = '';
    // remove spaces from search string

    return query;
  }

  postSearch() {}

  globalSearch() {}
}
