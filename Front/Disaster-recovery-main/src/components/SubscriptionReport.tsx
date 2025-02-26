import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { EnvelopeIcon, DevicePhoneMobileIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { ClipLoader } from 'react-spinners';

interface Subscription {
  id: number;
  method: 'email' | 'sms';
  contact: string;
  locations: string[];
  createdAt: string;
  updatedAt: string;
}

interface AnalyticsData {
  label: string;
  count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SubscriptionReportsDashboard: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [methodDistribution, setMethodDistribution] = useState<AnalyticsData[]>([]);
  const [locationDistribution, setLocationDistribution] = useState<AnalyticsData[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subsRes, methodsRes, locationsRes] = await Promise.all([
          axios.get('http://localhost:3000/subscriptions'),
          axios.get('http://localhost:3000/subscriptions/analytics/method-counts'),
          axios.get('http://localhost:3000/subscriptions/analytics/location-counts')
        ]);

        // Validate subscription data
        const validSubs = subsRes.data.filter((sub: Subscription) => 
          sub.locations && Array.isArray(sub.locations)
        );
        
        // Validate method counts
        const validMethods = methodsRes.data.filter((item: AnalyticsData) => 
          item.label && ['email', 'sms'].includes(item.label)
        );
        
        // Validate location counts
        const validLocations = locationsRes.data.filter((item: AnalyticsData) => 
          item.label && typeof item.label === 'string' && item.label.trim() !== ''
        );

        setSubscriptions(validSubs);
        setMethodDistribution(validMethods);
        setLocationDistribution(validLocations);
        
        // Extract and validate locations
        const allLocations = validSubs
          .flatMap(sub => sub.locations)
          .filter((location): location is string => 
            typeof location === 'string' && location.trim() !== ''
          );

        setLocations(Array.from(new Set(allLocations)));
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = subscriptions;

    if (selectedLocation) {
      filtered = filtered.filter(sub => 
        sub.locations.includes(selectedLocation)
      );
    }

    if (selectedMethod) {
      filtered = filtered.filter(sub => 
        sub.method === selectedMethod
      );
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(sub => {
        const subDate = new Date(sub.createdAt);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        return subDate >= start && subDate <= end;
      });
    }

    setFilteredSubscriptions(filtered);
  }, [selectedLocation, selectedMethod, dateRange, subscriptions]);


  const getMethodIcon = (method: string) => {
    return method === 'email' ? (
      <EnvelopeIcon className="h-5 w-5 text-blue-500 mr-2" />
    ) : (
      <DevicePhoneMobileIcon className="h-5 w-5 text-green-500 mr-2" />
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={40} color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Filter by Location</label>
          <Select onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Filter by Method</label>
          <Select onValueChange={setSelectedMethod}>
            <SelectTrigger>
              <SelectValue placeholder="All Methods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Methods</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <Input
              type="date"
              value={dateRange.start}
              onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">End Date</label>
            <Input
              type="date"
              value={dateRange.end}
              onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MapPinIcon className="h-6 w-6 mr-2 text-purple-500" />
              Subscriptions by Location
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <EnvelopeIcon className="h-6 w-6 mr-2 text-blue-500" />
              <DevicePhoneMobileIcon className="h-6 w-6 mr-2 text-green-500" />
              Notification Method Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={methodDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {methodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2 text-orange-500" />
            Subscription Details ({filteredSubscriptions.length} records)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Locations</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map(subscription => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {getMethodIcon(subscription.method)}
                        <Badge variant={subscription.method === 'email' ? 'default' : 'secondary'}>
                          {subscription.method}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{subscription.contact}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {subscription.locations.map(location => (
                          <Badge key={location} variant="outline" className="text-xs">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(subscription.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(subscription.updatedAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionReportsDashboard;