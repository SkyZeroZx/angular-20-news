import { Route } from '@angular/router';

import { ProductResolver } from './core/resolvers';
import { ContentComponent } from './layout/content/content.component';
import { PAGE_METADATA } from './core/constants/page-meta-data.constant';
import { MetaDataResolver } from './core/resolvers/metadata.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    data: {
      ...PAGE_METADATA.home,
    },
    resolve: {
      metaData: MetaDataResolver,
    },
    component: ContentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
      {
        path: 'products',
        data: {
          ...PAGE_METADATA.products,
        },
        resolve: {
          metaData: MetaDataResolver,
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/list-product/list-product.component'),
          },
          {
            path: ':id',
            resolve: { product: ProductResolver },
            loadComponent: () =>
              import('./pages/detail-product/detail-product.component'),
          },
        ],
      },
      {
        path: 'check-out',
        data: {
          ...PAGE_METADATA.checkOut,
        },
        resolve: {
          metaData: MetaDataResolver,
        },
        loadComponent: () => import('./pages/check-out/check-out.component'),
      }
    ],
  },
];
