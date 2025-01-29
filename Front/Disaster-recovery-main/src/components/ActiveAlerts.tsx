import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

const AlertTypes = ['All Types', 'FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding'];
const Severities = ['All Severities', 'Low', 'Medium', 'High'];

const ActiveAlerts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All Types');
  const [activeSeverity, setActiveSeverity] = useState('All Severities');
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:3000/alerts');
        if (!response.ok) {
          throw new Error('Failed to fetch alerts');
        }
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredAlerts = alerts.filter(
      (alert) =>
          alert.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (activeType === 'All Types' || alert.alert_type === activeType) &&
          (activeSeverity === 'All Severities' || alert.severity === activeSeverity)
  );

  if (loading) {
    return <div className="text-center text-gray-500">Loading alerts...</div>;
  }

  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold my-6 text-gray-800 tracking-tight">Active Alerts</h1>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex flex-grow">
                <Input
                    type="text"
                    placeholder="Search by location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-lg border-gray-300 text-sm focus:ring focus:ring-blue-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button className="bg-blue-600 rounded-lg hover:bg-blue-700 text-white px-5 py-3 text-sm">
                Search
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {AlertTypes.map((type) => (
                  <Button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`px-4 py-2 rounded border text-sm ${
                          activeType === type
                              ? 'bg-blue-600 text-white border-blue-600 shadow'
                              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {type}
                  </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {Severities.map((severity) => (
                  <Button
                      key={severity}
                      onClick={() => setActiveSeverity(severity)}
                      className={`px-4 py-2 rounded border text-sm ${
                          activeSeverity === severity
                              ? 'bg-blue-600 text-white border-blue-600 shadow'
                              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {severity}
                  </Button>
              ))}
            </div>
          </div>

          {/* Alerts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlerts.map((alert) => (
                <Card
                    key={alert.alert_id}
                    className="bg-white border rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <AlertTriangle
                          className={`mr-2 h-6 w-6 ${
                              alert.severity === 'High'
                                  ? 'text-red-500'
                                  : alert.severity === 'Medium'
                                      ? 'text-yellow-500'
                                      : 'text-green-500'
                          }`}
                      />
                      <h3 className="text-lg font-bold text-gray-800">{alert.alert_type} Alert</h3>
                    </div>

                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Severity: <span className="font-bold">{alert.severity}</span>
                    </p>
                    <p className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                      {alert.location}
                    </p>
                    <p className="flex items-center text-sm text-gray-600 mb-4">
                      <Clock className="mr-2 h-4 w-4 text-gray-400" />
                      {formatDate(alert.createdAt)}
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ActiveAlerts;