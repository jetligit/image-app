import { Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { AppService } from './app.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  coords: { lat: number; lng: number; date: string }[] = [];
  center = { lat: 40.7128, lng: -74.0060 };
  markers: { myMarker: google.maps.Marker, info: google.maps.InfoWindow}[] = [];
  zoom = 12;

  @ViewChild(GoogleMap) map!: GoogleMap;

  constructor(
    private appService: AppService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.getCoords();
  }

  onFileSelected(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const myFile = files[0];
      this.appService.processImage(myFile).subscribe({
        next: meta => {
          this.addMarker(meta.latitude, meta.longitude, meta.date);
        },
        error: err => console.error('Upload failed:', err)
      });
    }
  }

  getCoords(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.appService.getCoords().subscribe(rawCoords => {
      this.coords = rawCoords.map(coord => ({
        lat: coord.latitude,
        lng: coord.longitude,
        date: coord.date
      }));
      rawCoords.forEach(meta => {
        this.addMarker(meta.latitude, meta.longitude, meta.date);
      });
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
      error: (err: any) => console.error("failed to clear"),
    });
  }

  addMarker(lat: number, lng: number, date: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const Latlng = { lat, lng };
    const marker = new google.maps.Marker({
      position: Latlng,
      map: this.map.googleMap!,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<div>date: ${date}</div>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(this.map.googleMap!, marker);
    });

    this.markers.push({ myMarker: marker, info: infoWindow });
  }
}
