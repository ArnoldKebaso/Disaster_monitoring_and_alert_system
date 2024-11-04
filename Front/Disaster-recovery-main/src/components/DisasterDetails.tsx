import React from 'react';
import { ArrowLeft, AlertTriangle, MapPin, Clock, Thermometer, Wind, Droplets } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

// In a real app, this would be fetched from an API
const disasterDetails = {
  id: 1,
  type: 'Flood',
  severity: 'High',
  location: 'Riverside County',
  timestamp: '2023-06-15T13:30:00Z',
  description: 'Heavy rainfall has caused significant flooding in low-lying areas of Riverside County. Several roads are impassable, and some residential areas are at risk.',
  affectedArea: '150 sq km',
  evacuationOrders: 'Mandatory for zones A, B, and C',
  weatherConditions: {
    temperature: 18,
    windSpeed: 25,
    rainfall: 150
  },
  emergencyContacts: [
    { name: 'Local Emergency Services', number: '911' },
    { name: 'Flood Control District', number: '555-0123' },
    { name: 'Red Cross Shelter', number: '555-0456' }
  ]
};

const DisasterDetails: React.FC = () => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Alerts
      </Button>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className={`mr-2 h-8 w-8 ${disasterDetails.severity === 'High' ? 'text-red-500' : disasterDetails.severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`} />
            <h1 className="text-3xl font-bold">{disasterDetails.type} Alert</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-lg font-semibold">{disasterDetails.severity} Severity</p>
              <p className="flex items-center mt-2">
                <MapPin className="mr-2 h-4 w-4" /> {disasterDetails.location}
              </p>
              <p className="flex items-center mt-2">
                <Clock className="mr-2 h-4 w-4" /> {formatDate(disasterDetails.timestamp)}
              </p>
            </div>
            <div>
              <p className="font-semibold">Affected Area:</p>
              <p>{disasterDetails.affectedArea}</p>
              <p className="font-semibold mt-2">Evacuation Orders:</p>
              <p>{disasterDetails.evacuationOrders}</p>
            </div>
          </div>
          <p className="mt-4">{disasterDetails.description}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Weather Conditions</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Thermometer className="mr-2 h-4 w-4" /> Temperature
                </span>
                <span>{disasterDetails.weatherConditions.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Wind className="mr-2 h-4 w-4" /> Wind Speed
                </span>
                <span>{disasterDetails.weatherConditions.windSpeed} km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Droplets className="mr-2 h-4 w-4" /> Rainfall
                </span>
                <span>{disasterDetails.weatherConditions.rainfall} mm</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
            <ul className="space-y-2">
              {disasterDetails.emergencyContacts.map((contact, index) => (
                <li key={index} className="flex justify-between">
                  <span>{contact.name}</span>
                  <span className="font-semibold">{contact.number}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DisasterDetails;