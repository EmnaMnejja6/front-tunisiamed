import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from '../../models/clinic.model';
import { Doctor } from '../../models/doctor.model';
import { Review } from '../../models/review.model';
import { Specialty } from '../../models/specialty.model';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { PlacesService,NearbyPlace } from '../../services/places.service';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-clinic-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-detail.component.html',
  styleUrl: './clinic-detail.component.css'
})
export class ClinicDetailComponent implements AfterViewInit {

  constructor(private route: ActivatedRoute,
    private placesService: PlacesService,
    private clinicService: ClinicService

  ) { }
  loading: boolean = false;
  clinic: Clinic | null = null;
  doctors: Doctor[] = [];
  specialties: Specialty[] = [];
  reviews: Review[] = [];
  private map: L.Map | undefined;
  nearbyHotels: NearbyPlace[] = [];
  nearbyPharmacies: NearbyPlace[] = [];
  nearbySupermarkets: NearbyPlace[] = [];
  nearbyLabs: NearbyPlace[] = [];
  isLoadingPlaces = false;
  activeFilter: string = 'hotel'; // Track active filter, default to hotel
  activeTab: string = 'specialties'; // Track active tab


ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  
  if (id) {
    this.loading = true;
    this.clinicService.getClinicById(+id).subscribe({
      next: (data) => {
        this.clinic = data;
        this.specialties = data.specialties;
        this.doctors = data.doctors;
        this.loading = false;
        
        // Initialize map after clinic data is loaded
        setTimeout(() => {
          this.initializeMap();
          this.loadNearbyPlaces();
        }, 100);
      },
      error: (error) => {
        console.error('Error fetching clinic:', error);
        this.loading = false;
      }
    });
  }
}

  initializeMap() {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    if (this.clinic && this.clinic.latitude && this.clinic.longitude) {
      // Initialize the map
      this.map = L.map('map').setView([this.clinic.latitude, this.clinic.longitude], 15);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Add marker for the clinic
      L.marker([this.clinic.latitude, this.clinic.longitude])
        .addTo(this.map)
        .bindPopup(`<b>${this.clinic.name}</b><br>${this.clinic.city}`)
        .openPopup();
    }
  }

  loadNearbyPlaces() {
  if (!this.clinic) return;
  
  this.isLoadingPlaces = true;
  this.placesService.getNearbyPlaces(this.clinic.latitude, this.clinic.longitude, 2000)
    .subscribe({
      next: (places) => {
        this.nearbyHotels = places.hotels;
        this.nearbyPharmacies = places.pharmacies;
        this.nearbySupermarkets = places.supermarkets;
        this.nearbyLabs = places.labs;
        this.isLoadingPlaces = false;
        
        // Add markers to map
        this.addNearbyPlacesToMap(places);
      },
      error: (error) => {
        console.error('Error loading nearby:', error);
        this.isLoadingPlaces = false;
      }
    });
}
  addNearbyPlacesToMap(places: any) {
    if (!this.map) return;

    // Add hotel markers (blue)
    places.hotels.forEach((hotel: NearbyPlace) => {
      L.marker([hotel.lat, hotel.lon], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      })
      .addTo(this.map!)
      .bindPopup(`<b>🏨 ${hotel.name}</b><br>Hotel`);
    });

    // Add pharmacy markers (green)
    places.pharmacies.forEach((pharmacy: NearbyPlace) => {
      L.marker([pharmacy.lat, pharmacy.lon], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      })
      .addTo(this.map!)
      .bindPopup(`<b>💊 ${pharmacy.name}</b><br>Pharmacy`);
    });

    // Add lab markers (violet)
    places.labs.forEach((lab: NearbyPlace) => {
      L.marker([lab.lat, lab.lon], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      })
      .addTo(this.map!)
      .bindPopup(`<b>🔬 ${lab.name}</b><br>Laboratory`);
    });

    // Add supermarket markers (orange)
    places.supermarkets.forEach((supermarket: NearbyPlace) => {
      L.marker([supermarket.lat, supermarket.lon], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      })
      .addTo(this.map!)
      .bindPopup(`<b>🛒 ${supermarket.name}</b><br>Supermarket`);
    });
  }
  ngAfterViewInit() {
    this.loadNearbyPlaces(); 
  }

  calculateDistance(place: NearbyPlace): number {
    if (!this.clinic) return 0;
    
    // Haversine formula to calculate distance between two coordinates
    const R = 6371e3; // Earth's radius in meters
    const φ1 = this.clinic.latitude * Math.PI / 180;
    const φ2 = place.lat * Math.PI / 180;
    const Δφ = (place.lat - this.clinic.latitude) * Math.PI / 180;
    const Δλ = (place.lon - this.clinic.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return Math.round(distance);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  shouldShowCategory(category: string): boolean {
    return this.activeFilter === category;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
