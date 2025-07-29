import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError,tap, map, Subject } from 'rxjs';
import { ImageMetadata } from './ImageMetadata';

@Injectable({
    providedIn: 'root'
})
export class AppService{
    private url = 'http://localhost:8080/extract';
    constructor(private http: HttpClient) { }

    processImage(file: File): Observable<number[]>{
        const formData = new FormData();
        formData.append('image', file);
        return this.http.post<number[]>(this.url, formData);
    }

    getCoords(): Observable<ImageMetadata[]> {
        return this.http.get<ImageMetadata[]>(this.url).pipe(
          catchError(this.handleError<ImageMetadata[]>('getCoords', []))
        );
    }
      
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed:`, error); 
    
            if (error.status === 422) {
                console.error(" API error: Collection ID must be numeric or correctly formatted.");
            }
    
            //return throwError(() => new Error(error.message || "Unknown error")); 
            return of(result as T);
        };
      }
}