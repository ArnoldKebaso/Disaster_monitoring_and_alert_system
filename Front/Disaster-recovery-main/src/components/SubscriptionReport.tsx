import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Subscription {
  id: number;
  method: 'email' | 'sms';
  contact: string;
  locations: string[];
}

export default function SubscriptionReport() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [locationData, setLocationData] = useState<{ label: string; count: number }[]>([]);
  const [methodData, setMethodData] = useState<{ label: string; count: number }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subsRes, methodsRes, locationsRes] = await Promise.all([
          axios.get('/api/subscriptions'),
          axios.get('/api/subscriptions/method-counts'),
          axios.get('/api/subscriptions/location-counts')
        ]);

        setSubscriptions(subsRes.data);
        setMethodData(methodsRes.data);
        setLocationData(locationsRes.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const filteredSubscriptions = selectedLocation === 'all' || !selectedLocation
  ? subscriptions
    : subscriptions.filter(sub => sub.locations.includes(selectedLocation));
  
  if (loading) {
    return <div className="p-4 text-center">Loading subscriptions...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Location Filter */}
      <div className="max-w-xs">
                    <Select 
                onValueChange={setSelectedLocation} 
                value={selectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  {/* All Locations option with explicit value */}
                  <SelectItem value="all">
                    All Locations
                  </SelectItem>
                  
                  {/* Location items with validation */}
                  {locationData
                    .filter(location => location.label.trim() !== '')
                    .map((location) => (
                      <SelectItem 
                        key={location.label} 
                        value={location.label}
                      >
                        {location.label} ({location.count})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Method Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Methods</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={methodData}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Locations</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <XAxis 
                  dataKey="label" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Subscribers ({filteredSubscriptions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Method</th>
                  <th className="p-3 text-left">Contact</th>
                  <th className="p-3 text-left">Locations</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b">
                    <td className="p-3">
                      <span className={`badge ${sub.method === 'email' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {sub.method}
                      </span>
                    </td>
                    <td className="p-3">{sub.contact}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {sub.locations.map((location) => (
                          <span 
                            key={location} 
                            className="bg-gray-100 px-2 py-1 rounded text-sm"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}