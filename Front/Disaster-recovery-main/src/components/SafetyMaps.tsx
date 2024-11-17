import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Home } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import shelterIconUrl from '../assets/shelter.png'; // Replace with actual path

const disasters = [
  { id: 1, type: 'Flood', location: { lat: -1.2921, lng: 36.8219 }, severity: 'High' }, // Nairobi coordinates
  { id: 2, type: 'Wildfire', location: { lat: -1.2921, lng: 36.8172 }, severity: 'Medium' },
];

const shelters = [
  { id: 1, name: 'City Hall Shelter', location: { lat: -1.286389, lng: 36.817223 } }, // Nairobi coordinates
  { id: 2, name: 'Community Center', location: { lat: -1.285, lng: 36.820 } },
];

const center = [-1.286389, 36.817223]; // Center on Nairobi, Kenya

const SafetyMaps: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisaster, setSelectedDisaster] = useState<any>(null);

  useEffect(() => {
    const map = L.map('map').setView(center, 7); // Adjust zoom level as needed

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    disasters.forEach(disaster => {
      const marker = L.marker([disaster.location.lat, disaster.location.lng]).addTo(map);
      marker.on('click', () => setSelectedDisaster(disaster));
    });

    shelters.forEach(shelter => {
      L.marker([shelter.location.lat, shelter.location.lng], {
        icon: L.icon({
          iconUrl: shelterIconUrl,
          iconSize: [30, 30]
        })
      }).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery) {
      console.log('Searching for:', searchQuery);
      // Add logic for searching if needed
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

      {selectedDisaster && (
        <div className="alert alert-warning mt-4">
          <h2>{selectedDisaster.type} Alert</h2>
          <p>Severity: {selectedDisaster.severity}</p>
        </div>
      )}
    </div>
  );
};

export default SafetyMaps;
