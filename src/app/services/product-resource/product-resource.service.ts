import { HttpParams, httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PAGINATION_DEFAULT } from '../../core/constants';
import { PaginationOptions, ProductRAW } from '../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductResourceService {
  getProduct(paginationOptions: Signal<PaginationOptions>) {
    return httpResource<ProductRAW>(
      () => ({
        url: `${environment.API_URL}/products`,
        method: 'GET',
        params: {
          limit: paginationOptions().limit ?? '10',
          skip: paginationOptions().skip ?? '0',
        },
      }) 
    );
  }
}
