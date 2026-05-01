import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NearbyPlace {
  id: number;
  name: string;
  type: string;
  lat: number;
  lon: number;
  distance?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private overpassUrl = 'https://overpass-api.de/api/interpreter';

  constructor(private http: HttpClient) {}

  getNearbyPlaces(lat: number, lon: number, radius: number = 1000): Observable<any> {
    // Query for hotels, pharmacies, labs, and supermarkets nearby
    const query = `
      [out:json];
      (
        node["tourism"="hotel"](around:${radius},${lat},${lon});
        node["amenity"="pharmacy"](around:${radius},${lat},${lon});
        node["healthcare"="laboratory"](around:${radius},${lat},${lon});
        node["amenity"="clinic"]["healthcare:speciality"="laboratory"](around:${radius},${lat},${lon});
        node["shop"="supermarket"](around:${radius},${lat},${lon});
      );
      out body;
    `;

    return this.http.post(this.overpassUrl, query, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'json'
    }).pipe(
      map((response: any) => this.processOverpassResponse(response))
    );
  }

  private processOverpassResponse(response: any) {
    const places = {
      hotels: [] as NearbyPlace[],
      pharmacies: [] as NearbyPlace[],
      labs: [] as NearbyPlace[],
      supermarkets: [] as NearbyPlace[]
    };

    response.elements.forEach((element: any) => {
      const place: NearbyPlace = {
        id: element.id,
        name: element.tags?.name || 'Unnamed',
        type: element.tags?.amenity || element.tags?.tourism || element.tags?.shop || element.tags?.healthcare,
        lat: element.lat,
        lon: element.lon
      };

      if (element.tags?.tourism === 'hotel') {
        places.hotels.push(place);
      } else if (element.tags?.amenity === 'pharmacy') {
        places.pharmacies.push(place);
      } else if (element.tags?.healthcare === 'laboratory' || 
                 (element.tags?.amenity === 'clinic' && element.tags?.['healthcare:speciality'] === 'laboratory')) {
        places.labs.push(place);
      } else if (element.tags?.shop === 'supermarket') {
        places.supermarkets.push(place);
      }
    });

    return places;
  }
}
