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
  productSearch(
    content?: string,
    tags?: string[]
  ): Observable<ProductInfo[]> | null {
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
    let tagQuery: string = '&tag=';
    if (isTag) {
      for (let i = 0; i < tags!.length - 1; i++) {
        tagQuery = tagQuery + tags![i] + '&tag=';
      }
      tagQuery = tagQuery + tags![tags!.length - 1];
    }
    const query: string = 'product?' + contentQuery + tagQuery;
    console.log(query);
    return this.http.get<ProductInfo[]>(
      SEARCH_API + query,
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
