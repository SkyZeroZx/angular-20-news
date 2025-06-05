import { Directive, input, output } from '@angular/core';

@Directive({
  selector: '[appClickTracking]',
  host: {
    '(click)': 'trackingClick()',
  },
})
export class ClickTrackingDirective {
  customEvent = input<unknown>();

  trackingEvent = output<unknown>();

  trackingClick() {
    console.log('Tracking Click ...', { custom: this.customEvent() });
    this.trackingEvent.emit('Tracking Event ' + this.customEvent());
  }
}
