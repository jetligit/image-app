import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  coords: google.maps.LatLngLiteral[] = [];

  constructor(private appService: AppService) {}

  center: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 };
  zoom = 12;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      const myFile = files[0];
      this.appService.processImage(myFile).subscribe({
        next: coords => {
          console.log('Upload success:', coords);

          // Add the new location to the map markers
          const latLng = {
            lat: coords[0],   // assuming coords is [latitude, longitude]
            lng: coords[1]
          };

          this.coords.push(latLng);
          this.center = latLng; // Optionally re-center the map on the new marker
        },
        error: err => console.error('Upload failed:', err)
      });
    } else {
      console.warn("No file selected.");
    }
  }

  ngOnInit(): void {
    this.getCoords();
  }

  getCoords(): void {
    this.appService.getCoords().subscribe(rawCoords => {
      this.coords = rawCoords.map(coord => ({
        lat: coord.latitude,
        lng: coord.longitude
      }));
    });
  }
}
