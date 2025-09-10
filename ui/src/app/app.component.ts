import { Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { AppService } from './app.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { GoogleMapsLoaderService } from './google-maps-loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  coords: { lat: number; lng: number; date: string }[] = [];
  center = { lat: 40.7128, lng: -74.0060 };
  markers: { myMarker: google.maps.Marker, info: google.maps.InfoWindow }[] = [];
  zoom = 12;
  googleMapsLoaded = false;

  @ViewChild(GoogleMap) map!: GoogleMap;

  constructor(
    private appService: AppService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private mapsLoader: GoogleMapsLoaderService
  ) {}

  async ngOnInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    // Wait for Google Maps API to load
    await this.mapsLoader.load();
    this.googleMapsLoaded = true;
    this.cdr.detectChanges(); // ensure view updates after map is ready

    // Fetch backend coordinates
    this.getCoords();
  }

  onFileSelected(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const myFile = files[0];
      this.appService.processImage(myFile).subscribe({
        next: meta => this.addMarkerSafe(meta.latitude, meta.longitude, meta.date),
        error: err => console.error('Upload failed:', err)
      });
    }
  }

  getCoords(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.appService.getCoords().subscribe(rawCoords => {
      const newCoords = rawCoords.map(coord => ({
        lat: coord.latitude,
        lng: coord.longitude,
        date: coord.date
      }));

      newCoords.forEach(coord => this.addMarkerSafe(coord.lat, coord.lng, coord.date));
      this.coords.push(...newCoords);
    });
  }

  clear(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.appService.clearCoords().subscribe({
      next: () => {
        this.coords = [];
        this.markers.forEach(m => m.myMarker.setMap(null));
        this.markers = [];
        this.cdr.detectChanges();
      },
      error: err => console.error('Failed to clear', err),
    });
  }

  private addMarkerSafe(lat: number, lng: number, date: string) {
    if (this.map?.googleMap) {
      this.addMarker(lat, lng, date);
    } else {
      // Store for later in case map not ready
      this.coords.push({ lat, lng, date });
    }
  }

  private addMarker(lat: number, lng: number, date: string): void {
    if (!this.map?.googleMap) return;

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map.googleMap,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<div>date: ${date}</div>`,
    });

    marker.addListener('click', () => infoWindow.open(this.map.googleMap!, marker));

    this.markers.push({ myMarker: marker, info: infoWindow });
  }
}
