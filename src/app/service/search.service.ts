import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ProductService, ProductInfo, ProductList } from './product.service';
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
  productSearch(
    content?: string,
    tags?: string[],
    page?: number
  ): Observable<ProductList> | null {
    const isContent: boolean = !(
      content === undefined ||
      content === '' ||
      content === null
    );
    const isTag: boolean = !(
      tags === undefined ||
      tags.length === 0 ||
      tags === null
    );

    if (!isContent && !isTag) return null;

    /// query for content
    let contentQuery: string = 'q=';
    if (isContent) {
      content = content!.trim();
      const words = content.split(' ');
      console.log(words);
      for (let i = 0; i < words.length - 1; i++) {
        contentQuery = contentQuery + words[i] + '+';
      }
      contentQuery = contentQuery + words[words.length - 1];
    }

    /// query for tag
    let tagQuery: string = '&t=';
    if (isTag) {
      for (let i = 0; i < tags!.length - 1; i++) {
        tagQuery = tagQuery + tags![i] + '&t=';
      }
      tagQuery = tagQuery + tags![tags!.length - 1];
    }
    let pageQuery = '&p=' + '0';
    if (page !== undefined) {
      pageQuery = '&p=' + page.toString();
    }
    const query: string = 'product?' + contentQuery + tagQuery + pageQuery;
    console.log(query);
    return this.http.get<ProductList>(
      SEARCH_API + query,
      this.apiService.getHeader('json')
    );
  }

  postSearch() {}

  globalSearch() {}
}
