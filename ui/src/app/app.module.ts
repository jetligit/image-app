import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [],
  imports: [
    App,
    BrowserModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
