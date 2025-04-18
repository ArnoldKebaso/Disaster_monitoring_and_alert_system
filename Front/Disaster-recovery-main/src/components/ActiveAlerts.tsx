import React, { useState, useEffect } from "react";
import { Search, AlertTriangle, Clock, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

/**
 * Constants for filter options
 */
const AlertTypes = [
  "All Types",
  "RiverFlood",
  "FlashFlood",
  "UrbanFlood",
  "CoastalFlood",
  "ElNinoFlooding",
];
const Severities = ["All Severities", "Low", "Medium", "High"];
const TimeFilters = ["All Time", "24h", "48h", "7d"];

/**
 * ActiveAlerts Component - Displays a list of flood alerts with filtering capabilities
 * 
 * Features:
 * - Location selection screen
 * - Comprehensive filtering (search, type, severity, time range)
 * - Alert details modal
 * - Responsive design
 * - Animations with Framer Motion
 */
const ActiveAlerts: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("All Types");
  const [activeSeverity, setActiveSeverity] = useState("All Severities");
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedTime, setSelectedTime] = useState("All Time");
  const [alerts, setAlerts] = useState<any[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [locationsLoading, setLocationsLoading] = useState(true);

  /**
   * Fetch initial data (locations and alerts) on component mount
   * and when selectedLocation changes
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch locations
        const locationsResponse = await fetch("http://localhost:3000/alerts/locales");
        const locationsData = await locationsResponse.json();
        setLocations(locationsData);
        setLocationsLoading(false);

        // Fetch alerts if no location is selected
        if (!selectedLocation) {
          const alertsResponse = await fetch("http://localhost:3000/alerts");
          const alertsData = await alertsResponse.json();
          setAlerts(alertsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [selectedLocation]);

  /**
   * Fetch alerts when location changes
   */
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        let url = "http://localhost:3000/alerts";
        if (selectedLocation) {
          url += `?location=${encodeURIComponent(selectedLocation)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch alerts");
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, [selectedLocation]);

  /**
   * Format timestamp to readable date string
   * @param timestamp - The timestamp to format
   * @returns Formatted date string
   */
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  /**
   * Time filter mapping to milliseconds
   */
  const timeFilterMap = {
    "24h": 24 * 60 * 60 * 1000,
    "48h": 48 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
  };

  /**
   * Filter alerts based on current filter selections
   */
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === "All Types" || alert.alert_type === activeType;
    const matchesSeverity = activeSeverity === "All Severities" || alert.severity === activeSeverity;

    const alertDate = new Date(alert.createdAt);
    const matchesMonth =
      selectedMonth === "All Months" ||
      alertDate.toLocaleString("default", { month: "long" }) === selectedMonth;

    const timeDiff = Date.now() - alertDate.getTime();
    const matchesTime =
      selectedTime === "All Time" ||
      (timeFilterMap[selectedTime as keyof typeof timeFilterMap] &&
        timeDiff <= timeFilterMap[selectedTime as keyof typeof timeFilterMap]);

    return matchesSearch && matchesType && matchesSeverity && matchesMonth && matchesTime;
  });

  /**
   * Handle viewing alert details
   * @param alert - The alert to view details for
   */
  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert);
  };

  /**
   * Close the details modal
   */
  const closeDetailsModal = () => {
    setSelectedAlert(null);
  };

  // Show loading state while data is being fetched
  if (locationsLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 p-6">
        Loading data...
      </div>
    );
  }

  // ===================== LOCATION SELECTION SCREEN =====================
  if (!selectedLocation) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold my-6 text-gray-800">Select Location</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                      {alerts.filter((a) => a.location === location).length} active alerts
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {locationsLoading ? "Loading locations..." : "No locations found"}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===================== MAIN ALERTS SCREEN =====================
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Alerts in <span className="text-blue-600">{selectedLocation}</span>
            </h1>
            <p className="text-gray-600">{filteredAlerts.length} active alerts found</p>
          </motion.div>
          <Button
            onClick={() => {
              setSelectedLocation(null);
              setSearchQuery("");
              setActiveType("All Types");
              setActiveSeverity("All Severities");
            }}
            variant="ghost"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" /> Change Location
          </Button>
        </div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 space-y-6"
        >
          {/* Filter Row 1: Search + Month + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Input
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Month Selector */}
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Months">All Months</SelectItem>
                {Array.from({ length: 12 }).map((_, i) => (
                  <SelectItem
                    key={i}
                    value={new Date(0, i).toLocaleString("default", { month: "long" })}
                  >
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Time Range Selector */}
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {TimeFilters.map((filter) => (
                  <SelectItem key={filter} value={filter}>
                    {filter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Row 2: Alert Type Buttons */}
          <div className="flex flex-wrap gap-2">
            {AlertTypes.map((type) => (
              <Button
                key={type}
                variant={activeType === type ? "default" : "outline"}
                onClick={() => setActiveType(type)}
                className="rounded-full"
              >
                {type.replace("Flood", "")}
              </Button>
            ))}
          </div>

          {/* Filter Row 3: Severity Buttons */}
          <div className="flex flex-wrap gap-2">
            {Severities.map((severity) => (
              <Button
                key={severity}
                variant={activeSeverity === severity ? "default" : "outline"}
                onClick={() => setActiveSeverity(severity)}
                className={cn(
                  "rounded-full",
                  severity === "High"
                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                    : severity === "Medium"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    : severity === "Low"
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : ""
                )}
              >
                {severity}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.alert_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Severity Indicator */}
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          alert.severity === "High"
                            ? "bg-red-100/50"
                            : alert.severity === "Medium"
                            ? "bg-yellow-100/50"
                            : "bg-green-100/50"
                        )}
                      >
                        <AlertTriangle
                          className={cn(
                            "w-6 h-6",
                            alert.severity === "High"
                              ? "text-red-600"
                              : alert.severity === "Medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{alert.alert_type}</h3>
                        <span className="text-sm text-gray-500">
                          {alert.severity} severity
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(alert.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
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

        {/* Alert Details Modal */}
        <AnimatePresence>
          {selectedAlert && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
                <CardHeader className="border-b border-gray-200 p-4 flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">
                    {selectedAlert.alert_type} Details
                  </CardTitle>
                  <Button
                    onClick={closeDetailsModal}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      value={selectedAlert.evacuation_routes.join(", ")}
                    />
                    <DetailItem
                      label="Emergency Contacts"
                      value={selectedAlert.emergency_contacts.join(", ")}
                    />
                    <DetailItem
                      label="Precautionary Measures"
                      value={selectedAlert.precautionary_measures?.join(", ") || "N/A"}
                    />
                  </Section>
                  <Section title="Weather Forecast">
                    <DetailItem
                      label="Next 24 Hours"
                      value={selectedAlert.weather_forecast?.next_24_hours || "N/A"}
                    />
                    <DetailItem
                      label="Next 48 Hours"
                      value={selectedAlert.weather_forecast?.next_48_hours || "N/A"}
                    />
                  </Section>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem label="Created At" value={formatDate(selectedAlert.createdAt)} />
                    <DetailItem label="Updated At" value={formatDate(selectedAlert.updatedAt)} />
                  </div>
                </CardContent>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/**
 * DetailItem Component - Displays a label-value pair in a consistent format
 * @param label - The label text
 * @param value - The value text
 */
const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-sm">
    <span className="font-medium text-gray-500">{label}</span>
    <p className="text-gray-800 mt-1">{value}</p>
  </div>
);

/**
 * Section Component - Creates a titled section with consistent styling
 * @param title - The section title
 * @param children - The content to display within the section
 */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-gray-800 border-b border-gray-200 pb-2">
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

export default ActiveAlerts;



// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   AlertTriangle,
//   MapPin,
//   Clock,
//   X,
//   Loader2,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "../lib/utils";
// import { toast } from "sonner";

// const AlertTypes = [
//   "All Types",
//   "RiverFlood",
//   "FlashFlood",
//   "UrbanFlood",
//   "CoastalFlood",
//   "ElNinoFlooding",
// ];
// const Severities = ["All Severities", "Low", "Medium", "High"];
// const TimeFilters = ["All Time", "24h", "48h", "7d"];

// const ActiveAlerts: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeType, setActiveType] = useState("All Types");
//   const [activeSeverity, setActiveSeverity] = useState("All Severities");
//   const [selectedMonth, setSelectedMonth] = useState("All Months");
//   const [selectedTime, setSelectedTime] = useState("All Time");
//   const [alerts, setAlerts] = useState<any[]>([]);
//   const [locations, setLocations] = useState<string[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedAlert, setSelectedAlert] = useState<any>(null);
//   const [locationsLoading, setLocationsLoading] = useState(true);

//   // Fetch initial locations and alerts
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         // Fetch locations
//         const locationsResponse = await fetch("http://localhost:3000/alerts/locales");
//         const locationsData = await locationsResponse.json();
//         setLocations(locationsData);
//         setLocationsLoading(false);

//         // Fetch alerts if no location is selected
//         if (!selectedLocation) {
//           const alertsResponse = await fetch("http://localhost:3000/alerts");
//           const alertsData = await alertsResponse.json();
//           setAlerts(alertsData);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [selectedLocation]);

//   // Fetch alerts when location changes
//   useEffect(() => {
//     const fetchAlerts = async () => {
//       try {
//         let url = "http://localhost:3000/alerts";
//         if (selectedLocation) {
//           url += `?location=${encodeURIComponent(selectedLocation)}`;
//         }
//         const response = await fetch(url);
//         if (!response.ok) throw new Error("Failed to fetch alerts");
//         const data = await response.json();
//         setAlerts(data);
//       } catch (error) {
//         console.error("Error fetching alerts:", error);
//       }
//     };

//     fetchAlerts();
//   }, [selectedLocation]);

//   const formatDate = (timestamp: string) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   const timeFilterMap = {
//     "24h": 24 * 60 * 60 * 1000,
//     "48h": 48 * 60 * 60 * 1000,
//     "7d": 7 * 24 * 60 * 60 * 1000,
//   };

//   const filteredAlerts = alerts.filter((alert) => {
//     const matchesSearch = alert.location.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType = activeType === "All Types" || alert.alert_type === activeType;
//     const matchesSeverity = activeSeverity === "All Severities" || alert.severity === activeSeverity;

//     const alertDate = new Date(alert.createdAt);
//     const matchesMonth =
//       selectedMonth === "All Months" ||
//       alertDate.toLocaleString("default", { month: "long" }) === selectedMonth;

//     const timeDiff = Date.now() - alertDate.getTime();
//     const matchesTime =
//       selectedTime === "All Time" ||
//       (timeFilterMap[selectedTime as keyof typeof timeFilterMap] &&
//         timeDiff <= timeFilterMap[selectedTime as keyof typeof timeFilterMap]);

//     return matchesSearch && matchesType && matchesSeverity && matchesMonth && matchesTime;
//   });

//   const handleViewDetails = (alert: any) => {
//     setSelectedAlert(alert);
//   };

//   const closeDetailsModal = () => {
//     setSelectedAlert(null);
//   };

//   if (locationsLoading || loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500 p-6">
//         Loading data...
//       </div>
//     );
//   }

//   if (!selectedLocation) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <div className="w-full px-6">
//           <h1 className="text-4xl font-bold my-6 text-gray-800">Select Location</h1>
//           <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {locations.length > 0 ? (
//               locations.map((location) => (
//                 <Card
//                   key={location}
//                   onClick={() => setSelectedLocation(location)}
//                   className="cursor-pointer transition-shadow hover:shadow-lg"
//                 >
//                   <CardContent className="p-4">
//                     <h3 className="text-lg font-bold text-gray-800 mb-2">{location}</h3>
//                     <p className="text-sm text-gray-600">
//                       {alerts.filter((a) => a.location === location).length} active alerts
//                     </p>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               <div className="text-center py-8 text-gray-500">
//                 {locationsLoading ? "Loading locations..." : "No locations found"}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="w-full px-6 space-y-8">
//         {/* Header for selected location */}
//         <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-1"
//           >
//             <h1 className="text-3xl font-bold text-gray-800">
//               Alerts in <span className="text-blue-600">{selectedLocation}</span>
//             </h1>
//             <p className="text-gray-600">{filteredAlerts.length} active alerts found</p>
//           </motion.div>
//           <Button
//             onClick={() => {
//               setSelectedLocation(null);
//               setSearchQuery("");
//               setActiveType("All Types");
//               setActiveSeverity("All Severities");
//             }}
//             variant="ghost"
//             className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
//           >
//             <X className="h-4 w-4" /> Change Location
//           </Button>
//         </div>

//         {/* Filters Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//         >
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Input
//                 placeholder="Search alerts..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//             </div>

//             <Select value={selectedMonth} onValueChange={setSelectedMonth}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Month" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="All Months">All Months</SelectItem>
//                 {Array.from({ length: 12 }).map((_, i) => (
//                   <SelectItem
//                     key={i}
//                     value={new Date(0, i).toLocaleString("default", { month: "long" })}
//                   >
//                     {new Date(0, i).toLocaleString("default", { month: "long" })}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select value={selectedTime} onValueChange={setSelectedTime}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Time Range" />
//               </SelectTrigger>
//               <SelectContent>
//                 {TimeFilters.map((filter) => (
//                   <SelectItem key={filter} value={filter}>
//                     {filter}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {AlertTypes.map((type) => (
//               <Button
//                 key={type}
//                 variant={activeType === type ? "default" : "outline"}
//                 onClick={() => setActiveType(type)}
//                 className="rounded-full"
//               >
//                 {type.replace("Flood", "")}
//               </Button>
//             ))}
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {Severities.map((severity) => (
//               <Button
//                 key={severity}
//                 variant={activeSeverity === severity ? "default" : "outline"}
//                 onClick={() => setActiveSeverity(severity)}
//                 className={cn(
//                   "rounded-full",
//                   severity === "High"
//                     ? "bg-red-100 text-red-800 hover:bg-red-200"
//                     : severity === "Medium"
//                     ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
//                     : "bg-green-100 text-green-800 hover:bg-green-200"
//                 )}
//               >
//                 {severity}
//               </Button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Alerts Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredAlerts.map((alert) => (
//             <motion.div
//               key={alert.alert_id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <Card className="hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-500/30">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={cn(
//                           "p-2 rounded-lg",
//                           alert.severity === "High"
//                             ? "bg-red-100/50"
//                             : alert.severity === "Medium"
//                             ? "bg-yellow-100/50"
//                             : "bg-green-100/50"
//                         )}
//                       >
//                         <AlertTriangle
//                           className={cn(
//                             "w-6 h-6",
//                             alert.severity === "High"
//                               ? "text-red-600"
//                               : alert.severity === "Medium"
//                               ? "text-yellow-600"
//                               : "text-green-600"
//                           )}
//                         />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-800">{alert.alert_type}</h3>
//                         <span className="text-sm text-gray-500">
//                           {alert.severity} severity
//                         </span>
//                       </div>
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       {new Date(alert.createdAt).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Clock className="w-4 h-4" />
//                       <span>{formatDate(alert.createdAt)}</span>
//                     </div>
//                     <Button
//                       variant="outline"
//                       className="w-full mt-2"
//                       onClick={() => handleViewDetails(alert)}
//                     >
//                       View Details
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Details Modal */}
//         <AnimatePresence>
//           {selectedAlert && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             >
//               <motion.div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
//                 <CardHeader className="border-b border-gray-200 p-4 flex justify-between items-center">
//                   <CardTitle className="text-2xl font-bold">
//                     {selectedAlert.alert_type} Details
//                   </CardTitle>
//                   <Button
//                     onClick={closeDetailsModal}
//                     variant="ghost"
//                     size="sm"
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="h-5 w-5" />
//                   </Button>
//                 </CardHeader>
//                 <CardContent className="p-6 space-y-6">
//                   <div className="grid gap-4 md:grid-cols-2">
//                     <DetailItem label="Severity" value={selectedAlert.severity} />
//                     <DetailItem label="Location" value={selectedAlert.location} />
//                     <DetailItem label="Status" value={selectedAlert.status} />
//                     <DetailItem
//                       label="Water Levels"
//                       value={`Current: ${selectedAlert.water_levels.current}m | Predicted: ${selectedAlert.water_levels.predicted}m`}
//                     />
//                   </div>
//                   <Section title="Emergency Information">
//                     <DetailItem
//                       label="Evacuation Routes"
//                       value={selectedAlert.evacuation_routes.join(", ")}
//                     />
//                     <DetailItem
//                       label="Emergency Contacts"
//                       value={selectedAlert.emergency_contacts.join(", ")}
//                     />
//                     <DetailItem
//                       label="Precautionary Measures"
//                       value={selectedAlert.precautionary_measures?.join(", ") || "N/A"}
//                     />
//                   </Section>
//                   <Section title="Weather Forecast">
//                     <DetailItem
//                       label="Next 24 Hours"
//                       value={selectedAlert.weather_forecast?.next_24_hours || "N/A"}
//                     />
//                     <DetailItem
//                       label="Next 48 Hours"
//                       value={selectedAlert.weather_forecast?.next_48_hours || "N/A"}
//                     />
//                   </Section>
//                   <div className="grid gap-4 md:grid-cols-2">
//                     <DetailItem label="Created At" value={formatDate(selectedAlert.createdAt)} />
//                     <DetailItem label="Updated At" value={formatDate(selectedAlert.updatedAt)} />
//                   </div>
//                 </CardContent>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
//   <div className="text-sm">
//     <span className="font-medium text-gray-500">{label}</span>
//     <p className="text-gray-800 mt-1">{value}</p>
//   </div>
// );

// const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
//   title,
//   children,
// }) => (
//   <div className="space-y-4">
//     <h3 className="font-semibold text-lg text-gray-800 border-b border-gray-200 pb-2">
//       {title}
//     </h3>
//     <div className="space-y-3">{children}</div>
//   </div>
// );

// export default ActiveAlerts;
