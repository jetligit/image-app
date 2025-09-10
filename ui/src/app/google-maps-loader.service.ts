import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsLoaderService {
  private loader: Loader;

  constructor() {
    this.loader = new Loader({
      apiKey: 'AIzaSyAltVQlhGEc_JXTuic4feCAyWJikyqJdrY',
      version: 'weekly',
    });
  }

  load(): Promise<typeof google> {
    return this.loader.load();
  }
}
