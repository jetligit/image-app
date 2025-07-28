import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit{
  coords: number[] = [];
  constructor(private appService: AppService) {}

  center: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 };
  zoom = 12;
  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      const myFile = files[0];
      this.appService.processImage(myFile);
    } else {
      console.warn("No file selected.");
    }
  }

  ngOnInit(): void {
      this.getCoords();
  }

  getCoords(): void{
    this.appService.getCoords().subscribe(coords =>{
      this.coords = coords;
    });
  }
}
