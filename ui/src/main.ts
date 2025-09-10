import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { GoogleMapsLoaderService } from './app/google-maps-loader.service';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    GoogleMapsLoaderService,
  ],
}).catch((err) => console.error(err));
