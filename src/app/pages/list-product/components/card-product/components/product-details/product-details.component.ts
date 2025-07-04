import { JsonPipe } from '@angular/common';
import { Component, output } from '@angular/core';
import { ModalComponent } from '../../../../../../shared/ui/services/modal';

@Component({
  selector: 'app-product-details',
  imports: [JsonPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  readonly data: unknown;
  modalInstance: ModalComponent;
  closed = output<void>();

  onClose() {
    console.log('onClose', this.data);
    this.modalInstance.close();
  }
}
