import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

interface Subscription {
  id: number;
  method: 'email' | 'sms';
  contact: string;
  locations: string[];
  createdAt: string;
}

interface AnalyticsData {
  label: string;
  count: number;
}

const SubscriptionReport: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [methodDistribution, setMethodDistribution] = useState<AnalyticsData[]>([]);
  const [locationDistribution, setLocationDistribution] = useState<AnalyticsData[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial analytics data
 useEffect(() => {
  const fetchAnalyticsData = async () => {
    try {
      const [methodsRes, locationsRes] = await Promise.all([
        axios.get('http://localhost:3000/subscriptions/analytics/method-counts'),
        axios.get('http://localhost:3000/subscriptions/analytics/location-counts')
      ]);

      // Validate and transform method data
      const validMethods = methodsRes.data
        .filter((item: any) => 
          typeof item.label === 'string' && 
          ['email', 'sms'].includes(item.label.toLowerCase())
        )
        .map((item: any) => ({
          label: item.label.trim(),
          count: Number(item.count) || 0
        }));

      // Validate and transform location data
      const validLocations = locationsRes.data
        .filter((item: any) => 
          typeof item.label === 'string' &&
          item.label.trim() !== ''
        )
        .map((item: any) => ({
          label: item.label.trim(),
          count: Number(item.count) || 0
        }));

      setMethodDistribution(validMethods);
      setLocationDistribution(validLocations);
      
      // Extract and validate unique locations
      const allLocations = validLocations
        .map(item => item.label)
        .filter(l => l.trim() !== '');
        
      setLocations(Array.from(new Set(allLocations)));
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('API Error:', err);
    }
  };

  fetchAnalyticsData();
}, []);

  // Handle month filter
  useEffect(() => {
    const fetchMonthlySubscriptions = async () => {
      if (!selectedMonth) return;

      try {
        const [year, month] = selectedMonth.split('-');
        const response = await axios.get(
          `http://localhost:3000/subscriptions/filter/month?year=${year}&month=${month}`
        );
        setFilteredSubscriptions(response.data);
      } catch (err) {
        setError('Failed to load monthly subscriptions');
        console.error('Monthly filter error:', err);
      }
    };

    fetchMonthlySubscriptions();
  }, [selectedMonth]);

  // Handle location filter
  useEffect(() => {
    const fetchLocationSubscriptions = async () => {
      if (!selectedLocation) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/subscriptions/filter/location?location=${encodeURIComponent(selectedLocation)}`
        );
        setFilteredSubscriptions(response.data);
      } catch (err) {
        setError('Failed to load location subscriptions');
        console.error('Location filter error:', err);
      }
    };

    fetchLocationSubscriptions();
  }, [selectedLocation]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="w-64">
          <label className="block text-sm font-medium mb-2">Filter by Month</label>
          <input
            type="month"
            className="w-full p-2 border rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
        
        <div className="w-64">
          <label className="block text-sm font-medium mb-2">Filter by Location</label>
          <Select 
            value={selectedLocation} 
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Locations
              </SelectItem>
              {locations.map(location => (
                <SelectItem 
                  key={location} 
                  value={location}
                  // Add validation check
                  disabled={!location || typeof location !== 'string'}
                >
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Methods Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={methodDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Locations Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={locationDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card>
      </div>

      {/* Filtered Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Filtered Subscriptions ({filteredSubscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Locations</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map(subscription => (
                <TableRow key={subscription.id}>
                  <TableCell className="capitalize">{subscription.method}</TableCell>
                  <TableCell>{subscription.contact}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {subscription.locations.map(location => (
                        <span 
                          key={location}
                          className="px-2 py-1 bg-gray-100 rounded text-sm"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(subscription.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionReport;










// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// interface Subscription {
//   id: number;
//   method: 'email' | 'sms';
//   contact: string;
//   locations: string[];
// }

// export default function SubscriptionReport() {
//   const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
//   const [locationData, setLocationData] = useState<{ label: string; count: number }[]>([]);
//   const [methodData, setMethodData] = useState<{ label: string; count: number }[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [subsRes, methodsRes, locationsRes] = await Promise.all([
//           axios.get('/api/subscriptions'),
//           axios.get('/api/subscriptions/method-counts'),
//           axios.get('/api/subscriptions/location-counts')
//         ]);

//         setSubscriptions(subsRes.data);
//         setMethodData(methodsRes.data);
//         setLocationData(locationsRes.data);
//       } catch (error) {
//         console.error('Fetch error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

// const filteredSubscriptions = selectedLocation === 'all' || !selectedLocation
//   ? subscriptions
//   : subscriptions.filter(sub => sub.locations.includes(selectedLocation));
  
//   if (loading) {
//     return <div className="p-4 text-center">Loading subscriptions...</div>;
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* Location Filter */}
//       <div className="max-w-xs">
//                     <Select 
//                 onValueChange={setSelectedLocation} 
//                 value={selectedLocation}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Filter by location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {/* All Locations option with explicit value */}
//                   <SelectItem value="all">
//                     All Locations
//                   </SelectItem>
                  
//                   {/* Location items with validation */}
//                   {locationData
//                     .filter(location => location.label.trim() !== '')
//                     .map((location) => (
//                       <SelectItem 
//                         key={location.label} 
//                         value={location.label}
//                       >
//                         {location.label} ({location.count})
//                       </SelectItem>
//                     ))}
//                 </SelectContent>
//               </Select>
//       </div>

//       {/* Charts Grid */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Method Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Notification Methods</CardTitle>
//           </CardHeader>
//           <CardContent className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={methodData}>
//                 <XAxis dataKey="label" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar 
//                   dataKey="count" 
//                   fill="#3b82f6" 
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Location Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Subscription Locations</CardTitle>
//           </CardHeader>
//           <CardContent className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={locationData}>
//                 <XAxis 
//                   dataKey="label" 
//                   angle={-45} 
//                   textAnchor="end" 
//                   height={70}
//                 />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar 
//                   dataKey="count" 
//                   fill="#10b981" 
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Subscriptions Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             Subscribers ({filteredSubscriptions.length})
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="p-3 text-left">Method</th>
//                   <th className="p-3 text-left">Contact</th>
//                   <th className="p-3 text-left">Locations</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSubscriptions.map((sub) => (
//                   <tr key={sub.id} className="border-b">
//                     <td className="p-3">
//                       <span className={`badge ${sub.method === 'email' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
//                         {sub.method}
//                       </span>
//                     </td>
//                     <td className="p-3">{sub.contact}</td>
//                     <td className="p-3">
//                       <div className="flex flex-wrap gap-1">
//                         {sub.locations.map((location) => (
//                           <span 
//                             key={location} 
//                             className="bg-gray-100 px-2 py-1 rounded text-sm"
//                           >
//                             {location}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }