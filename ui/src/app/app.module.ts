import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    BrowserModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
