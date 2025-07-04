import { DOCUMENT, NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ModelSignal,
  OnInit,
  Renderer2,
  computed,
  inject,
  model,
  output,
  signal,
} from '@angular/core';
import { FADE_ANIMATION_DELAY } from '../constants/animation.constant';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [NgClass, NgStyle],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
  private readonly modalHost = inject(ElementRef);
  private readonly document = inject<Document>(DOCUMENT);
  private readonly modalService = inject(ModalService);
  private readonly renderer2 = inject(Renderer2);

  protected show = signal<boolean>(true);

  mode: ModelSignal<'dialog' | 'modal' | 'bottom-sheet'> = model('modal');
  // This is required since ngStyle is using `any` as well
  // More details in https://angular.io/api/common/NgStyle
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style = model<{ [k: string]: any }>({});

  setting = computed(() => ({
    isModal: this.mode() === 'modal',
    isDialog: this.mode() === 'dialog',
    isBottomSheet: this.mode() === 'bottom-sheet',
  }));

  closed = output<void>();

  //	private elementSticky: HTMLElement;
  private htmlBaseElement!: HTMLHtmlElement;

  ngOnInit(): void {
    this.hiddenScroll();
  }

  private hiddenScroll() {
    this.htmlBaseElement = this.document.getElementsByTagName('html')[0];
    this.htmlBaseElement.style.overflowY = 'hidden';
  }

  private addScroll() {
    if (this.modalService.listModalComponentRef.length === 0) {
      this.renderer2.setStyle(this.htmlBaseElement, 'overflowY', 'visible');
    }
  }

  open() {
    this.show.set(true);
  }

  close() {
    this.show.set(false);

    setTimeout(() => {
      this.closed.emit();
      this.modalHost.nativeElement.remove();
      this.addScroll();
    }, FADE_ANIMATION_DELAY);
  }
}
