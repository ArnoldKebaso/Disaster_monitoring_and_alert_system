import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

interface Location {
  location_id: string;
  region_name: string;
  risk_level: string;
  evacuation_routes: string[];
  key_facilities: string[];
}

const riskLevels = ['low', 'medium', 'high'];

const LocationComponent: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLocation, setNewLocation] = useState<Location>({
    location_id: '',
    region_name: '',
    risk_level: '',
    evacuation_routes: [],
    key_facilities: [],
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLocation({
      ...newLocation,
      [name]: value,
    });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'evacuation_routes' | 'key_facilities') => {
    const values = e.target.value.split(',').map((item) => item.trim());
    setNewLocation({
      ...newLocation,
      [field]: values,
    });
  };

  const addLocation = async () => {
    try {
      await axios.post('http://localhost:3000/locations', newLocation);
      alert('Location added successfully!');
      setNewLocation({
        location_id: '',
        region_name: '',
        risk_level: '',
        evacuation_routes: [],
        key_facilities: [],
      });
    } catch (error) {
      console.error('Error adding location:', error);
      alert('Failed to add location.');
    }
  };

  if (loading) {
    return <div>Loading locations...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Locations</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add a New Location</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="region_name" className="block text-sm font-medium text-gray-700">
              Region Name
            </label>
            <Input
              type="text"
              id="region_name"
              name="region_name"
              placeholder="Region Name"
              value={newLocation.region_name}
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label htmlFor="risk_level" className="block text-sm font-medium text-gray-700">
              Risk Level
            </label>
            <select
              id="risk_level"
              name="risk_level"
              value={newLocation.risk_level}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500"
            >
              <option value="">Select Risk Level</option>
              {riskLevels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="evacuation_routes" className="block text-sm font-medium text-gray-700">
              Evacuation Routes (comma-separated)
            </label>
            <Input
              type="text"
              id="evacuation_routes"
              placeholder="Route A, Route B, Route C"
              onChange={(e) => handleArrayChange(e, 'evacuation_routes')}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label htmlFor="key_facilities" className="block text-sm font-medium text-gray-700">
              Key Facilities (comma-separated)
            </label>
            <Input
              type="text"
              id="key_facilities"
              placeholder="Hospital A, Fire Station 1, Police Station Central"
              onChange={(e) => handleArrayChange(e, 'key_facilities')}
              className="mt-1 block w-full"
            />
          </div>

          <Button type="button" onClick={addLocation} className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
            Add Location
          </Button>
        </form>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Existing Locations</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <Card key={location.location_id} className="border rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">{location.region_name}</h3>
              <p className="font-semibold mb-2">Risk Level: {location.risk_level}</p>
              <p className="mb-2">Evacuation Routes: {location.evacuation_routes.join(', ')}</p>
              <p>Key Facilities: {location.key_facilities.join(', ')}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationComponent;
