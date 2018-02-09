import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

const ENDPOINT_PRODUCT = 'products';
const ENDPOINT_PRODUCT_SEARCH = 'products/search';
const ENDPOINT_PRODUCT_SUGGESTIONS = 'products/suggestions';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';
const USER_ENDPOINT = 'users/';

@Injectable()
export class BaseService {
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) { }

  protected promise(url: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => { }, err => this.logError(err));
    });
  }

  protected logError(err) {
    console.error('There was an error: ' + err);
  }

  protected getBaseEndPoint() {
    return (
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite +
      '/'
    );
  }

  getProductEndpoint() {
    return this.getBaseEndPoint() + ENDPOINT_PRODUCT;
  }

  getProductSearchEndpoint() {
    return this.getBaseEndPoint() + ENDPOINT_PRODUCT_SEARCH;
  }

  getProductSuggestionsEndpoint() {
    return this.getBaseEndPoint() + ENDPOINT_PRODUCT_SUGGESTIONS;
  }

  getCartEndpoint(userId: string) {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.getBaseEndPoint() + cartEndpoint;
  }

  getOAuthEndpoint() {
    return this.configService.server.baseUrl + OAUTH_ENDPOINT;
  }

  getUserEndpoint() {
    return this.getBaseEndPoint() + USER_ENDPOINT;
  }
}
