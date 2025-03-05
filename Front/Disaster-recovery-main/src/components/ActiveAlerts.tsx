import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, MapPin, Clock, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const AlertTypes = ['All Types', 'RiverFlood', 'FlashFlood', 'UrbanFlood', 'CoastalFlood', 'ElNinoFlooding'];
const Severities = ['All Severities', 'Low', 'Medium', 'High'];
const TimeFilters = ['All Time', '24h', '48h', '7d'];

const ActiveAlerts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All Types');
  const [activeSeverity, setActiveSeverity] = useState('All Severities');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedTime, setSelectedTime] = useState('All Time');
  const [alerts, setAlerts] = useState<any[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [locationsLoading, setLocationsLoading] = useState(true);
  

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch locations
        const locationsResponse = await fetch('http://localhost:3000/alerts/locales');
        const locationsData = await locationsResponse.json();
        setLocations(locationsData);
        setLocationsLoading(false);

        // Fetch alerts if no location selected
        if (!selectedLocation) {
          const alertsResponse = await fetch('http://localhost:3000/alerts');
          const alertsData = await alertsResponse.json();
          setAlerts(alertsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

const fetchLocations = async () => {
  try {
    const response = await fetch('http://localhost:3000/alerts/locales');
    
    // Add debug logging
    console.log('Locations response:', response);
    
    if (!response.ok) {
      console.error('Failed to fetch locations, status:', response.status);
      setLocations([]);
      return;
    }
    
    const data = await response.json();
    console.log('Locations data received:', data);
    
    if (Array.isArray(data)) {
      setLocations(data);
    } else {
      console.error('Invalid locations data format:', data);
      setLocations([]);
    }
  } catch (error) {
    console.error('Error fetching locations:', error);
    setLocations([]);
  } finally {
    setLocationsLoading(false);
  }
};


  useEffect(() => {
  const fetchAlerts = async () => {
    try {
      let url = 'http://localhost:3000/alerts';
      
      // Add location filter if selected
      if (selectedLocation) {
        url += `?location=${encodeURIComponent(selectedLocation)}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  fetchAlerts();
}, [selectedLocation]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const timeFilterMap = {
    '24h': 24 * 60 * 60 * 1000,
    '48h': 48 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === 'All Types' || alert.alert_type === activeType;
    const matchesSeverity = activeSeverity === 'All Severities' || alert.severity === activeSeverity;
    
    const alertDate = new Date(alert.createdAt);
    const matchesMonth = selectedMonth === 'All Months' || 
      alertDate.toLocaleString('default', { month: 'long' }) === selectedMonth;
    
    const timeDiff = Date.now() - alertDate.getTime();
    const matchesTime = selectedTime === 'All Time' || 
      (timeFilterMap[selectedTime as keyof typeof timeFilterMap] && 
       timeDiff <= timeFilterMap[selectedTime as keyof typeof timeFilterMap]);

    return matchesSearch && matchesType && matchesSeverity && matchesMonth && matchesTime;
  });

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert);
  };

  const closeDetailsModal = () => {
    setSelectedAlert(null);
  };

  if (locationsLoading || loading) {
    return <div className="text-center text-gray-500 p-6">Loading data...</div>;
  }

  if (!selectedLocation) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold my-6 text-gray-800">Select Location</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {locations.length > 0 ? (
              locations.map((location) => (
              <Card
                key={location}
                onClick={() => setSelectedLocation(location)}
                className="cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{location}</h3>
                  <p className="text-sm text-gray-600">
                    {alerts.filter(a => a.location === location).length} active alerts
                  </p>
                </CardContent>
              </Card>
              ))
            ) : (
                <div className="text-center py-8 text-gray-500">
    {locationsLoading ? 'Loading locations...' : 'No locations found'}
  </div>
          )}
          </div>
        </div>
      </div>
    );
  }


  if (locationsLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/40">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!selectedLocation) {
    return (
      <div className="p-6 bg-muted/40 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Flood Alert Locations
            </h1>
            <p className="text-muted-foreground">
              Select a location to view active flood alerts
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {locations.length > 0 ? (
              locations.map((location) => (
                <motion.div
                  key={location}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card
                    onClick={() => setSelectedLocation(location)}
                    className="cursor-pointer transition-shadow hover:shadow-lg border-muted-foreground/20 hover:border-blue-500/30 group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100/50 rounded-lg">
                          <MapPin className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{location}</h3>
                          <p className="text-sm text-muted-foreground">
                            {alerts.filter(a => a.location === location).length} active alerts
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 space-y-4">
                <AlertTriangle className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground">No locations available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-muted/40 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Alerts in <span className="text-blue-600">{selectedLocation}</span>
            </h1>
            <p className="text-muted-foreground">
              {filteredAlerts.length} active alerts found
            </p>
          </motion.div>
          <Button 
            onClick={() => {
              setSelectedLocation(null);
              setSearchQuery('');
              setActiveType('All Types');
              setActiveSeverity('All Severities');
            }}
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" /> Change Location
          </Button>
        </div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 bg-background p-6 rounded-xl shadow-sm border border-muted-foreground/20"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Months">All Months</SelectItem>
                {Array.from({ length: 12 }).map((_, i) => (
                  <SelectItem 
                    key={i}
                    value={new Date(0, i).toLocaleString('default', { month: 'long' })}
                  >
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {TimeFilters.map((filter) => (
                  <SelectItem key={filter} value={filter}>{filter}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {AlertTypes.map((type) => (
              <Button
                  key={type}
                  variant={activeType === type ? 'default' : 'outline'} // Changed from 'secondary'
                  onClick={() => setActiveType(type)}
                  className="rounded-full"
                >
                  {type.replace('Flood', '')}
                </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {Severities.map((severity) => (
              <Button
              key={severity}
              variant={activeSeverity === severity ? 'default' : 'outline'} // Changed from 'secondary'
              onClick={() => setActiveSeverity(severity)}
              className={cn(
                'rounded-full',
                severity === 'High' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                severity === 'Medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                'bg-green-100 text-green-800 hover:bg-green-200'
              )}
            >
              {severity}
            </Button>
            ))}
          </div>
        </motion.div>

        {/* Alerts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.alert_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-lg transition-shadow border-muted-foreground/20 hover:border-blue-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        alert.severity === 'High' ? 'bg-red-100/50' :
                        alert.severity === 'Medium' ? 'bg-yellow-100/50' :
                        'bg-green-100/50'
                      )}>
                        <AlertTriangle className={cn(
                          "w-6 h-6",
                          alert.severity === 'High' ? 'text-red-600' :
                          alert.severity === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        )} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{alert.alert_type}</h3>
                        <span className="text-sm text-muted-foreground">
                          {alert.severity} severity
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(alert.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(alert.createdAt)}</span>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => handleViewDetails(alert)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Details Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-muted-foreground/20"
            >
              <CardHeader className="border-b border-muted-foreground/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    {selectedAlert.alert_type} Details
                  </CardTitle>
                  <Button
                    onClick={closeDetailsModal}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <DetailItem label="Severity" value={selectedAlert.severity} />
                  <DetailItem label="Location" value={selectedAlert.location} />
                  <DetailItem label="Status" value={selectedAlert.status} />
                  <DetailItem 
                    label="Water Levels" 
                    value={`Current: ${selectedAlert.water_levels.current}m | Predicted: ${selectedAlert.water_levels.predicted}m`}
                  />
                </div>

                <Section title="Emergency Information">
                  <DetailItem
                    label="Evacuation Routes"
                    value={selectedAlert.evacuation_routes.join(', ')}
                  />
                  <DetailItem
                    label="Emergency Contacts"
                    value={selectedAlert.emergency_contacts.join(', ')}
                  />
                  <DetailItem
                    label="Precautionary Measures"
                    value={selectedAlert.precautionary_measures.join(', ')}
                  />
                </Section>

                <Section title="Weather Forecast">
                  <DetailItem
                    label="Next 24 Hours"
                    value={selectedAlert.weather_forecast.next_24_hours}
                  />
                  <DetailItem
                    label="Next 48 Hours"
                    value={selectedAlert.weather_forecast.next_48_hours}
                  />
                </Section>

                <div className="grid gap-4 md:grid-cols-2">
                  <DetailItem label="Created At" value={formatDate(selectedAlert.createdAt)} />
                  <DetailItem label="Updated At" value={formatDate(selectedAlert.updatedAt)} />
                </div>
              </CardContent>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-sm">
    <span className="font-medium text-muted-foreground">{label}</span>
    <p className="text-foreground mt-1">{value}</p>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-foreground border-b border-muted-foreground/20 pb-2">
      {title}
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

export default ActiveAlerts;
// import React, { useState, useEffect } from 'react';
// import { Search, AlertTriangle, MapPin, Clock, X } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Card, CardContent } from './ui/card';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';

// const AlertTypes = ['All Types', 'RiverFlood', 'FlashFlood', 'UrbanFlood', 'CoastalFlood', 'ElNinoFlooding'];
// const Severities = ['All Severities', 'Low', 'Medium', 'High'];
// const TimeFilters = ['All Time', '24h', '48h', '7d'];

// const ActiveAlerts: React.FC = () => {
  
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-4xl font-bold text-gray-800">
//             Alerts for {selectedLocation}
//           </h1>
//           <Button 
//               onClick={() => {
//                 setSelectedLocation(null);
//                 setSearchQuery('');
//                 setActiveType('All Types');
//                 setActiveSeverity('All Severities');
//               }}
//               variant="outline"
//               className="gap-2"
//             >
//               <X className="h-4 w-4" /> Back to Locations
//             </Button>
//         </div>

//         {/* Filters Section */}
//         <div className="mb-8 space-y-4">
//           <div className="flex flex-wrap gap-4">
//             <div className="flex-1 relative">
//               <Input
//                 placeholder="Search within location..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//             </div>

//             <Select value={selectedMonth} onValueChange={setSelectedMonth}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select Month" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All Months">All Months</SelectItem>
//                 {Array.from({ length: 12 }).map((_, i) => (
//                   <SelectItem 
//                     key={i}
//                     value={new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   >
//                     {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select value={selectedTime} onValueChange={setSelectedTime}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select Time Range" />
//               </SelectTrigger>
//               <SelectContent>
//                 {TimeFilters.map((filter) => (
//                   <SelectItem key={filter} value={filter}>{filter}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {AlertTypes.map((type) => (
//               <Button
//                 key={type}
//                 variant={activeType === type ? 'default' : 'outline'}
//                 onClick={() => setActiveType(type)}
//               >
//                 {type}
//               </Button>
//             ))}
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {Severities.map((severity) => (
//               <Button
//                 key={severity}
//                 variant={activeSeverity === severity ? 'default' : 'outline'}
//                 onClick={() => setActiveSeverity(severity)}
//               >
//                 {severity}
//               </Button>
//             ))}
//           </div>
//         </div>

//         {/* Alerts Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredAlerts.map((alert) => (
//             <Card key={alert.alert_id} className="hover:shadow-lg transition-shadow">
//               <CardContent className="p-4">
//                 <div className="flex items-center mb-4">
//                   <AlertTriangle
//                     className={`mr-2 h-6 w-6 ${
//                       alert.severity === 'High' ? 'text-red-500' :
//                       alert.severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'
//                     }`}
//                   />
//                   <h3 className="text-lg font-bold text-gray-800">{alert.alert_type}</h3>
//                 </div>

//                 <div className="space-y-2">
//                   <p className="text-sm font-medium text-gray-600">
//                     Severity: <span className="font-bold">{alert.severity}</span>
//                   </p>
//                   <p className="flex items-center text-sm text-gray-600">
//                     <Clock className="mr-2 h-4 w-4 text-gray-400" />
//                     {formatDate(alert.createdAt)}
//                   </p>
//                   <Button
//                     className="w-full mt-4"
//                     onClick={() => handleViewDetails(alert)}
//                   >
//                     View Details
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Details Modal */}
//         {selectedAlert && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-gray-800">{selectedAlert.alert_type} Details</h2>
//                 <Button
//                   onClick={closeDetailsModal}
//                   variant="ghost"
//                   className="h-10 w-10 p-2"
//                 >
//                   <X className="h-6 w-6" />
//                 </Button>
//               </div>

//               <div className="space-y-4">
//                 <DetailItem label="Severity" value={selectedAlert.severity} />
//                 <DetailItem label="Location" value={selectedAlert.location} />
//                 <DetailItem label="Description" value={selectedAlert.description} />
//                 <DetailItem 
//                   label="Water Levels" 
//                   value={`Current: ${selectedAlert.water_levels.current}, Predicted: ${selectedAlert.water_levels.predicted}`}
//                 />
//                 <DetailItem
//                   label="Evacuation Routes"
//                   value={selectedAlert.evacuation_routes.join(', ')}
//                 />
//                 <DetailItem
//                   label="Emergency Contacts"
//                   value={selectedAlert.emergency_contacts.join(', ')}
//                 />
//                 <DetailItem
//                   label="Precautionary Measures"
//                   value={selectedAlert.precautionary_measures.join(', ')}
//                 />
//                 <DetailItem
//                   label="Weather Forecast"
//                   value={`24h: ${selectedAlert.weather_forecast.next_24_hours}, 48h: ${selectedAlert.weather_forecast.next_48_hours}`}
//                 />
//                 <DetailItem label="Status" value={selectedAlert.status} />
//                 <DetailItem label="Created At" value={formatDate(selectedAlert.createdAt)} />
//                 <DetailItem label="Updated At" value={formatDate(selectedAlert.updatedAt)} />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
//   <div className="text-sm">
//     <span className="font-bold text-gray-800">{label}:</span>
//     <p className="text-gray-600 mt-1">{value}</p>
//   </div>
// );

// export default ActiveAlerts;