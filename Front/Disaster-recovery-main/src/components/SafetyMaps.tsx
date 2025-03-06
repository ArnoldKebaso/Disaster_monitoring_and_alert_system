import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import shelterIconUrl from '../assets/shelter.png';
import floodIconUrl from '../assets/flood.png';
import routeIconUrl from '../assets/route-marker.jpg';
import { useNavigate } from 'react-router-dom';
import {toast} from 'sonner'
import { Loader2, Search, MapPin, Home, AlertCircle, Navigation, Compass } from 'lucide-react';
interface FloodAlert {
  alert_id: number;
  alert_type: string;
  location: string;
  severity: string;
  evacuation_routes: string[];
  water_levels: {
    current: string;
    predicted: string;
  };
  emergency_contacts: string[];
}
interface Window {
  chrome?: any;
  safari?: any;
}
// Custom icons with better visual hierarchy
const floodIcon = L.icon({
  iconUrl: floodIconUrl,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

const shelterIcon = L.icon({
  iconUrl: shelterIconUrl,
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  popupAnchor: [0, -42]
});
interface LocationCoordinates {
  [key: string]: {
    lat: number;
    lng: number;
  };
}

const routeIcon = L.icon({
  iconUrl: routeIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// interface FloodAlert {
//   alert_id: number;
//   alert_type: string;
//   location: string;
//   severity: string;
//   evacuation_routes: string[];
//   water_levels: {
//     current: string;
//     predicted: string;
//   };
//   emergency_contacts: string[];
// }

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
  const [currentRoute, setCurrentRoute] = useState<L.Polyline | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [floodAlerts, setFloodAlerts] = useState<FloodAlert[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!floodAlerts.length) return;

    const mapInstance = L.map('map').setView([0.1667, 34.1667], 11);
    setMap(mapInstance);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    const layerGroup = L.layerGroup().addTo(mapInstance);
    setMarkerLayer(layerGroup);

    // Add interactive evacuation routes
    floodAlerts.forEach(alert => {
      const location = locationCoordinates[alert.location];
      if (location) {
        const marker = L.marker([location.lat, location.lng], { icon: floodIcon })
          .addTo(layerGroup)
          .on('click', () => showEvacuationRoutes(alert));
        
        marker.bindPopup(createAlertPopupContent(alert));
      }
    });

    return () => mapInstance.remove();
  }, [floodAlerts]);
;

  useEffect(() => {
    // Fetch flood alerts from API
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:3000/alerts');
        const data = await response.json();
        setFloodAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const createAlertPopupContent = (alert: FloodAlert) => `
    <div class="popup-content">
      <h3 class="font-bold text-red-600 mb-2">${alert.location}</h3>
      <p class="text-sm"><strong>Type:</strong> ${alert.alert_type}</p>
      <p class="text-sm"><strong>Severity:</strong> <span class="text-${getSeverityColor(alert.severity)}">${alert.severity}</span></p>
      <p class="text-sm"><strong>Current Water Level:</strong> ${alert.water_levels.current}</p>
      <button onclick="handleNavigate('${alert.location}')" class="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm">
        Show Evacuation Route
      </button>
    </div>
  `;
const handleClick = () => {
    navigate('/report'); // Navigate to the report page
  };
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'red-600';
      case 'medium': return 'orange-500';
      default: return 'yellow-500';
    }
  };

  const showEvacuationRoutes = async (alert: FloodAlert) => {
    if (!map || !markerLayer || !userLocation) return;

    setIsLoading(true);
    try {
      // Clear previous routes
      if (currentRoute) currentRoute.remove();
      markerLayer.clearLayers();

      // Get evacuation route using OpenRouteService
      const route = await calculateRoute(userLocation, [
        locationCoordinates[alert.location].lat,
        locationCoordinates[alert.location].lng
      ]);
      

      // Draw new route
      const polyline = L.polyline(route, {
        color: '#FF6B6B',
        weight: 4,
        opacity: 0.8,
        dashArray: '5, 5'
      }).addTo(map);

      setCurrentRoute(polyline);

      // Add route markers with instructions
      route.forEach((point, index) => {
        L.marker(point, { icon: routeIcon })
          .addTo(markerLayer)
          .bindPopup(`<div class="p-2"><strong>Step ${index + 1}</strong><br>${getRouteInstruction(index)}</div>`);
      });

      // Add destination marker
      L.marker([locationCoordinates[alert.location].lat, locationCoordinates[alert.location].lng], { icon: shelterIcon })
        .addTo(markerLayer)
        .bindPopup(`<strong>${alert.location} Shelter</strong><br>Capacity: 500 people`);

      map.fitBounds(polyline.getBounds());
    } catch (error) {
      console.error('Routing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateRoute = async (start: [number, number], end: [number, number]) => {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${process.env.NEXT_PUBLIC_ORS_KEY}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`
    );
    const data = await response.json();
    return data.features[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]);
  };

  const getRouteInstruction = (index: number) => {
    const instructions = [
      'Head northeast on Main Road',
      'Turn right at the junction',
      'Continue straight for 2km',
      'Shelter will be on your left'
    ];
    return instructions[index] || 'Continue following the marked route';
  };

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      toast.error('Geolocation Error', {
        description: 'Your browser does not support geolocation',
      });
      return;
    }
  
    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        map?.setView([latitude, longitude], 13);
        
        L.marker([latitude, longitude], { icon: routeIcon })
          .addTo(markerLayer!)
          .bindPopup('<strong>Your Current Location</strong>');
          
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.error('Geolocation error:', error);
        
        let errorMessage = 'Unable to retrieve your location';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access was denied. Please enable permissions in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get location timed out.';
            break;
        }
  
        toast.error('Location Error', {
          description: errorMessage,
          action: {
            label: 'Settings',
            onClick: () => {
              // Safer browser detection
              const isChrome = navigator.userAgent.includes('Chrome');
              const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
            
              if (isChrome) {
                window.open('chrome://settings/content/location');
              } else if (isSafari) {
                window.open('prefs:root=Privacy');
              } else {
                // Generic settings guide
                window.open('https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DDesktop');
              }
            }
          }
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,  // 10 seconds
        maximumAge: 0
      }
    );
  };
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
    <div className="p-6 bg-gray-50 min-h-screen">
                {isLoading && (
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Locating...</span>
                  </div>
          )}
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Compass className="text-blue-600" />
          Flood Safety Navigation Map
        </h1>

        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search location or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow border-2 border-gray-200 focus:border-blue-500"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
            <Button
              type="button"
              onClick={handleLocateUser}
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              <Navigation className="mr-2 h-4 w-4" /> Locate Me
            </Button>
          </form>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="lg:col-span-3 h-[600px]">
            <CardContent className="p-0 h-full relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 z-50 flex items-center justify-center">
                  <div className="animate-pulse text-blue-600">
                    <Navigation className="h-12 w-12 animate-bounce" />
                    <p className="mt-2">Calculating safest route...</p>
                  </div>
                </div>
              )}
              <div id="map" className="h-full rounded-lg border border-gray-200" />
            </CardContent>
          </Card>

          <Card className="h-[600px] overflow-y-auto">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="text-blue-600" /> Map Legend
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <img src={floodIconUrl} alt="Flood" className="w-8 h-8 mr-3" />
                  <span className="text-sm font-medium">Flood Alert Zone</span>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <img src={shelterIconUrl} alt="Shelter" className="w-8 h-8 mr-3" />
                  <span className="text-sm font-medium">Emergency Shelter</span>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <img src={routeIconUrl} alt="Route" className="w-8 h-8 mr-3" />
                  <span className="text-sm font-medium">Evacuation Route</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
                <Button variant="outline" className="w-full mb-2" onClick={handleClick}>
                  <AlertCircle className="mr-2 h-4 w-4" /> Report Flood
                </Button>
                <Button variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" /> Find Nearest Shelter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SafetyMaps;