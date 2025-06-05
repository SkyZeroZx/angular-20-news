import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  provideAppInitializer,
   provideBrowserGlobalErrorListeners,
   provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { appRoutes } from './app.routes';
import { initHttpCache } from './core/config/http-cache';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideZonelessChangeDetection(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    // better form to configure initialization of App Configuration instead of APP_INITIALIZER
    provideAppInitializer(initHttpCache()),
  ],
};
 