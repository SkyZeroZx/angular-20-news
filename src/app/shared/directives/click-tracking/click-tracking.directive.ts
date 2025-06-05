import { Directive } from '@angular/core';

@Directive({
  selector: '[appClickTracking]',
  host: {
    '(click)': 'trackingClick()',
  },
})
export class ClickTrackingDirective {
  trackingClick() {
    console.log('Tracking Click ...');
  }
}
