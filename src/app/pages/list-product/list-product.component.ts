import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { filter, map, take, tap } from 'rxjs';

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PAGINATION_DEFAULT } from '../../core/constants';
import {
  PaginationOptions,
  PaginationResult,
  ProductCard,
} from '../../core/interfaces';
import { ProductService } from '../../services/products';
import { ScrollEndDirective } from '../../shared/directives/scroll-end';
import { CardProductComponent } from './components/card-product';
import { ProductResourceService } from '../../services/product-resource/product-resource.service';
import { createPaginationMetaData, toProductCard } from '../../core/util';

@Component({
  selector: 'app-list-product',
  imports: [
    CardProductComponent,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    ScrollEndDirective,
    NgTemplateOutlet,
    MatIconModule,
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
}) /* allow to write import more clean when lazy load when you add default modificators in class declaration */
export default class ListProductComponent {
  private readonly productService = inject(ProductService);

  private readonly productResource = inject(ProductResourceService);

  pagination = signal<PaginationOptions>(structuredClone(PAGINATION_DEFAULT));

  resource = this.productResource.getProduct(this.pagination);

  value: Signal<PaginationResult<ProductCard>> = toSignal(
    toObservable(this.resource.value).pipe(
      filter((res) => !!res),
      map((res) => ({
        data: res.products.map(toProductCard),
        meta: createPaginationMetaData(res.total, res.skip, res.limit),
      })),
      tap(({ data }) => {
        this.products.set([...this.products(), ...data]);
      })
    )
  );

  // Example rxResource
  // listProducts = rxResource<
  //   PaginationResult<ProductCard>,
  //   { pagination: PaginationOptions }
  // >({
  //   params: () => ({ pagination: this.pagination() }),
  //   stream: ({ params }) =>
  //     this.productService.getProducts(params.pagination).pipe(
  //       tap(({ data }) => {
  //         this.products.set([...this.products(), ...data]);
  //       })
  //     ),
  // });

  readonly loading$ = toObservable(this.resource.isLoading);

  firstLoad = toSignal(
    this.loading$.pipe(
      filter((value) => !value),
      take(1)
    )
  );

  products = signal<ProductCard[]>([]);

  metaPagination = computed(() => this.value()?.meta);

  endOfList = computed(
    () => !this.metaPagination()?.hasNextPage && !this.resource.error()
  );

  onScrollEnd() {
    // to avoid when scrolling cancel request when update signal is emitted
    if (this.resource.isLoading() || !this.metaPagination()?.hasNextPage) {
      return;
    }

    this.pagination.update((pagination) => ({
      limit: pagination.limit,
      skip: pagination.skip + pagination.limit,
    }));
  }
}
