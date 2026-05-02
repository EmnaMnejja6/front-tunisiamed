import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideHttpClient(),
    // ... other providers
  ]
};
