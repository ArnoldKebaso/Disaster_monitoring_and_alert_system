import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Home } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";


const disasters = [
  { id: 1, type: 'Flood', location: { lat: 34.052235, lng: -118.243683 }, severity: 'High' },
  { id: 2, type: 'Wildfire', location: { lat: 34.069444, lng: -118.445278 }, severity: 'Medium' },
];

const shelters = [
  { id: 1, name: 'City Hall Shelter', location: { lat: 34.054208, lng: -118.242766 } },
  { id: 2, name: 'Community Center', location: { lat: 34.052030, lng: -118.243700 } },
];

const center = [34.052235, -118.243683];

const SafetyMaps: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisaster, setSelectedDisaster] = useState<any>(null);

  useEffect(() => {
    const map = L.map('map').setView(center, 13);

    // Base layer using OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // OpenWeatherMap temperature overlay
    const tempLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_OPENWEATHER_API_KEY`, {
      maxZoom: 19,
      attribution: '© OpenWeatherMap'
    }).addTo(map);

    // Disaster markers
    disasters.forEach(disaster => {
      const marker = L.marker([disaster.location.lat, disaster.location.lng]).addTo(map);
      marker.on('click', () => setSelectedDisaster(disaster));
    });

    // Shelter markers
    shelters.forEach(shelter => {
      L.marker([shelter.location.lat, shelter.location.lng], {
        icon: L.icon({
          iconUrl: '/shelter-icon.png', // Replace with your shelter icon URL
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
    console.log('Searching for:', searchQuery);
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
