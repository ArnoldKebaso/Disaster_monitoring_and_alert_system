import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Home } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import shelterIconUrl from '../assets/shelter.png'; // Ensure the path is correct

const center = [-1.286389, 36.817223]; // Nairobi, Kenya

const shelters = [
  { id: 1, name: 'City Hall Shelter', location: { lat: -1.286389, lng: 36.817223 } },
  { id: 2, name: 'Community Center', location: { lat: -1.285, lng: 36.820 } },
];

const SafetyMaps: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [markerLayer, setMarkerLayer] = useState<L.LayerGroup | null>(null);

  useEffect(() => {
    const mapInstance = L.map('map').setView(center, 7);
    setMap(mapInstance);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    const layerGroup = L.layerGroup().addTo(mapInstance);
    setMarkerLayer(layerGroup);

    // Add shelter markers with custom icons
    shelters.forEach(shelter => {
      L.marker([shelter.location.lat, shelter.location.lng], {
        icon: L.icon({
          iconUrl: shelterIconUrl,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        })
      }).addTo(layerGroup).bindPopup(`<strong>${shelter.name}</strong>`);
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
            iconUrl: shelterIconUrl, // You can replace this with a different icon if needed
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
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                <span>Disaster Area</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 text-green-500 mr-2" />
                <span>Shelter</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyMaps;
