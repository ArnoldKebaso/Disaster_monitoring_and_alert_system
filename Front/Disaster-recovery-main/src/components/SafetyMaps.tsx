import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Home, AlertCircle } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import shelterIconUrl from '../assets/shelter.png'; // Ensure the path is correct
import floodIconUrl from '../assets/flood.png'; // Ensure the path is correct

// Center the map on Budalangi area
const center = [0.1667, 34.1667]; // Approximate coordinates for Budalangi, Kenya

// JSON data for flood alerts
const floodAlerts = [
  // Your JSON data here
];

// Location options for markers
const locationOptions = [
  { value: "Bumadeya", label: "Bumadeya" },
  { value: "Budalangi Central", label: "Budalangi Central" },
  { value: "Budubusi", label: "Budubusi" },
  { value: "Mundere", label: "Mundere" },
  { value: "Musoma", label: "Musoma" },
  { value: "Sibuka", label: "Sibuka" },
  { value: "Sio Port", label: "Sio Port" },
  { value: "Rukala", label: "Rukala" },
  { value: "Mukhweya", label: "Mukhweya" },
  { value: "Sigulu Island", label: "Sigulu Island" },
  { value: "Siyaya", label: "Siyaya" },
  { value: "Nambuku", label: "Nambuku" },
  { value: "West Bunyala", label: "West Bunyala" },
  { value: "East Bunyala", label: "East Bunyala" },
  { value: "South Bunyala", label: "South Bunyala" },
];

// Coordinates for the locations (replace with actual coordinates from your JSON data)
const locationCoordinates = {
  Bumadeya: { lat: -0.1667, lng: 34.1667 },
  "Budalangi Central": { lat: 0.1667, lng: 34.1667 },
  Budubusi: { lat: 0.1667, lng: 34.1667 },
  Mundere: { lat: 0.1667, lng: 34.1667 },
  Musoma: { lat: 0.1667, lng: 34.1667 },
  Sibuka: { lat: 0.1667, lng: 34.1667 },
  "Sio Port": { lat: 0.1667, lng: 34.1667 },
  Rukala: { lat: 0.1667, lng: 34.1667 },
  Mukhweya: { lat: 0.1667, lng: 34.1667 },
  "Sigulu Island": { lat: 0.1667, lng: 34.1667 },
  Siyaya: { lat: 0.1667, lng: 34.1667 },
  Nambuku: { lat: 0.1667, lng: 34.1667 },
  "West Bunyala": { lat: 0.1667, lng: 34.1667 },
  "East Bunyala": { lat: 0.1667, lng: 34.1667 },
  "South Bunyala": { lat: 0.1667, lng: 34.1667 },
};

const SafetyMaps: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [markerLayer, setMarkerLayer] = useState<L.LayerGroup | null>(null);

  useEffect(() => {
    const mapInstance = L.map('map').setView(center, 10); // Zoom level adjusted for better visibility
    setMap(mapInstance);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    const layerGroup = L.layerGroup().addTo(mapInstance);
    setMarkerLayer(layerGroup);

    // Add markers for each location
    locationOptions.forEach(location => {
      const { lat, lng } = locationCoordinates[location.value];
      const marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: floodIconUrl,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        })
      }).addTo(layerGroup);

      // Find the corresponding flood alert for this location
      const alert = floodAlerts.find(alert => alert.location === location.value);
      if (alert) {
        const popupContent = `
          <strong>${location.label}</strong><br>
          <strong>Type:</strong> ${alert.alert_type}<br>
          <strong>Severity:</strong> ${alert.severity}<br>
          <strong>Evacuation Routes:</strong><br>
          ${alert.evacuation_routes.join('<br>')}
        `;
        marker.bindPopup(popupContent);

        // Draw evacuation routes
        alert.evacuation_routes.forEach(route => {
          // Assuming route is a string of coordinates (e.g., "lat1,lng1 lat2,lng2")
          const routeCoordinates = route.split(' ').map(coord => {
            const [lat, lng] = coord.split(',').map(Number);
            return [lat, lng];
          });
          L.polyline(routeCoordinates, { color: 'red' }).addTo(layerGroup);
        });
      }
    });

    return () => {
      mapInstance.remove();
    };
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!map || !markerLayer) return;

    try {
      // Use OpenStreetMap Nominatim for geocoding
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        map.setView([lat, lon], 13);

        // Clear existing markers and add a new one
        markerLayer.clearLayers();
        L.marker([lat, lon], {
          icon: L.icon({
            iconUrl: floodIconUrl, // You can replace this with a different icon if needed
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
          })
        }).addTo(markerLayer).bindPopup(`<strong>Searched Location: ${searchQuery}</strong>`);
      } else {
        console.log('Location not found');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Safety Maps & Evacuation Routes</h1>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <div id="map" style={{ height: '600px', width: '100%' }}></div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Legend</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span>Flood Alert</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 text-green-500 mr-2" />
                <span>Shelter</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                <span>Evacuation Route</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyMaps;