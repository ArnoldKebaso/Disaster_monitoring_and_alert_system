import React, { useState } from 'react';
import { Search, AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import axios from 'axios'; // Import Axios
const API_URL = process.env.REACT_APP_API_URL;

export const getAlertById = async (alertId:number) => {
  try {
    const response = await axios.get(`${API_URL}/alerts/${alertId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alert:", error);
  }
};





const alerts = [
  { id: 1, type: 'Flood', severity: 'High', location: 'Riverside County', timestamp: '2023-06-15T13:30:00Z' },
  { id: 2, type: 'Earthquake', severity: 'Medium', location: 'San Francisco Bay Area', timestamp: '2023-06-15T12:45:00Z' },
  { id: 3, type: 'Wildfire', severity: 'High', location: 'Southern California', timestamp: '2023-06-15T11:15:00Z' },
];

const AlertTypes = ['All Types', 'Flood', 'Earthquake', 'Wildfire', 'Tsunami', 'Tornado'];
const Severities = ['All Severities', 'Low', 'Medium', 'High'];

const ActiveAlerts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All Types');
  const [activeSeverity, setActiveSeverity] = useState('All Severities');
  const [alertDetails, setAlertDetails] = useState(null); // State to store alert details
  const [error, setError] = useState<string | null>(null); // Updated state to store error

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Filtered alerts based on search, type, and severity
  const filteredAlerts = alerts.filter(alert => 
    alert.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeType === 'All Types' || alert.type === activeType) &&
    (activeSeverity === 'All Severities' || alert.severity === activeSeverity)
  );

  // //Fetch alert details from the backend when "View Details" is clicked
  // const handleViewDetails = async (alertId: number) => {
  //   try {
  //     const response = await axios.get(`https://kerberos.co.ke/api/alerts/${alertId}`);
  //     setAlertDetails(response.data); // Store response in state
  //     setError(null); // Clear error when successful
  //   } catch (err) {
  //     setError('Error fetching alert details'); // Set error message
  //     console.error(err);
  //   }
  // };


  const handleViewDetails = async (alertId: number) => {
  // try {
    const response = await axios.get(`http://localhost:3000/alerts`, { timeout: 5000 });
    setAlertDetails(response.data); // Store response in state
    setError(null); // Clear error when successful
  // } catch (err: any) {
  //   if (err.code === 'ERR_NETWORK') {
  //     setError('Network error, please check your connection or try again later.');
  //   } else {
  //     setError('Error fetching alert details');
  //   }
  //   console.error(err);
  // }
};

  

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Active Alerts</h1>
      
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="relative flex-grow mr-2">
            <Input
              type="text"
              placeholder="Search by location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Search
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {AlertTypes.map(type => (
            <Button 
              key={type}
              onClick={() => setActiveType(type)}
              variant={activeType === type ? "default" : "outline"}
              className={`px-4 py-2 text-sm ${activeType === type ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {type}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Severities.map(severity => (
            <Button 
              key={severity}
              onClick={() => setActiveSeverity(severity)}
              variant={activeSeverity === severity ? "default" : "outline"}
              className={`px-4 py-2 text-sm ${activeSeverity === severity ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {severity}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAlerts.map(alert => (
          <Card key={alert.id} className="border rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className={`mr-2 h-5 w-5 ${
                  alert.severity === 'High' ? 'text-red-500' : 
                  alert.severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <h3 className="text-xl font-semibold">{alert.type} Alert</h3>
              </div>
              <p className="font-semibold mb-2">{alert.severity} Severity</p>
              <p className="flex items-center mb-1">
                <MapPin className="mr-2 h-4 w-4" /> {alert.location}
              </p>
              <p className="flex items-center mb-4">
                <Clock className="mr-2 h-4 w-4" /> {formatDate(alert.timestamp)}
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleViewDetails(alert.id)} // Call function on click
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Display alert details when available */}
      {alertDetails && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Alert Details</h2>
          <pre>{JSON.stringify(alertDetails, null, 2)}</pre>
        </div>
      )}

      {/* Display error message if there's an error */}
      {error && (
        <div className="mt-6 p-4 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default ActiveAlerts;
