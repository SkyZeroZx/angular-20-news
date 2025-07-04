import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { ProductCard } from '../../../../core/interfaces';
import { ShopCartService } from '../../../../services/shop-cart';
import { ClickTrackingDirective } from '../../../../shared/directives/click-tracking/click-tracking.directive';
import {
  ModalModule,
  ModalService,
} from '../../../../shared/ui/services/modal';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@Component({
  selector: 'app-card-product',
  imports: [
    MatCardModule,
    MatButtonModule,
    NgOptimizedImage,
    RouterLink,
    ClickTrackingDirective,
    ModalModule,
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
  private readonly shopCartService = inject(ShopCartService);
  private readonly modalService = inject(ModalService);
  readonly product = input.required<ProductCard>();

  addToCard() {
    this.shopCartService.add({
      ...this.product(),
      quantity: 1,
    });
  }

  showDetails() {
    this.modalService.open(ProductDetailsComponent, {
      data: this.product(),
    });
  }
}
