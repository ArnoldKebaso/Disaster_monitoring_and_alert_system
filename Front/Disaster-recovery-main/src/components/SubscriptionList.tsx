import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EnvelopeIcon, DevicePhoneMobileIcon, MapPinIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ClipLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
interface Subscription {
  id: number;
  method: string;
  contact: string;
}

interface Alert {
  alert_id: number;
  alert_type: string;
  severity: string;
  location: string;
  description: string;
  water_levels: {
    current: string;
    predicted: string;
  };
  evacuation_routes: string[];
  emergency_contacts: string[];
  precautionary_measures: string[];
  weather_forecast: {
    next_24_hours: string;
    next_48_hours: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}
interface SentAlert {
  email: boolean;
  sms: boolean;
  timestamp?: string;
}

interface AlertLog {
  id: string; // Unique ID for each log
  method: "email" | "sms"; // Method used (email or SMS)
  contact: string; // Recipient's email or phone number
  alertType: string; // Type of alert (e.g., Flood, Fire)
  location: string; // Location of the alert
  description: string; // Description of the alert
  severity: string; // Severity of the alert
  water_levels: {
    current: string;
    predicted: string;
  };
  evacuation_routes: string[];
  emergency_contacts: string[];
  precautionary_measures: string[];
  weather_forecast: {
    next_24_hours: string;
    next_48_hours: string;
  };
  timeSent: string; // Timestamp when the alert was sent
  status: "success" | "failed"; // Status of the alert
}

const useAlertLogger = () => {
  const [logs, setLogs] = useState<AlertLog[]>([]);

  const logAlert = (log: Omit<AlertLog, "id">) => {
    const newLog = {
      id: Math.random().toString(36).substring(7), // Generate a unique ID
      ...log,
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  return { logs, logAlert };
};

const SubscriptionList: React.FC = () => {
  const [subscriptionsByLocation, setSubscriptionsByLocation] = useState<{ [key: string]: Subscription[] }>({});
  const { logs, logAlert } = useAlertLogger(); // Use the logging hook
  const [isEmailLoading, setIsEmailLoading] = useState<{ [key: string]: boolean }>({});
  const [isSmsLoading, setIsSmsLoading] = useState<{ [key: string]: boolean }>({});
 const [sentAlerts, setSentAlerts] = useState<{ [key: string]: SentAlert }>({});
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);
  const filteredLocations = Object.entries(subscriptionsByLocation).filter(
    ([location]) => location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/subscriptions/by-location');
      setSubscriptionsByLocation(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };
  const markAsSent = (location: string, method: 'email' | 'sms') => {
    setSentAlerts(prev => ({
      ...prev,
      [location]: {
        ...prev[location],
        [method]: true,
        timestamp: new Date().toISOString()
      }
    }));
  };

  // Fetch alert data
  const fetchAlertData = async (location: string): Promise<Alert | null> => {
    try {
      const response = await axios.get(`http://localhost:3000/alerts?location=${location}`);
      if (response.data.length > 0) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching alert data:', error);
      return null;
    }
  };

  // Send email alerts with logging
  const handleSendEmailAlert = async (location: string) => {
    setIsEmailLoading((prev) => ({ ...prev, [location]: true })); // Set loading state

    const alertData = await fetchAlertData(location);
    if (!alertData) {
      alert(`No active alert found for ${location}.`);
      setIsEmailLoading((prev) => ({ ...prev, [location]: false })); // Reset loading state
      return;
    }

    const subject = `Flood Alert for ${location}`;
    const text = `
      Alert Type: ${alertData.alert_type}
      Severity: ${alertData.severity}
      Location: ${alertData.location}
      Description: ${alertData.description}
      Water Levels: Current - ${alertData.water_levels.current}, Predicted - ${alertData.water_levels.predicted}
      Evacuation Routes: ${alertData.evacuation_routes.join(', ')}
      Emergency Contacts: ${alertData.emergency_contacts.join(', ')}
      Precautionary Measures: ${alertData.precautionary_measures.join(', ')}
      Weather Forecast: Next 24 Hours - ${alertData.weather_forecast.next_24_hours}, Next 48 Hours - ${alertData.weather_forecast.next_48_hours}
      Status: ${alertData.status}
      Last Updated: ${new Date(alertData.updatedAt).toLocaleString()}
    `;

    const subscriptions = subscriptionsByLocation[location].filter((sub) => sub.method === 'email');
    for (const subscription of subscriptions) {
      try {
        await axios.post('http://localhost:3000/subscriptions/send-email', {
          to: subscription.contact,
          subject,
          text,
          alertType: alertData.alert_type,
          location: alertData.location,
          description: alertData.description,
          severity: alertData.severity,
          water_levels: alertData.water_levels,
          evacuation_routes: alertData.evacuation_routes,
          emergency_contacts: alertData.emergency_contacts,
          precautionary_measures: alertData.precautionary_measures,
          weather_forecast: alertData.weather_forecast,
        });

        // Log the email alert
        logAlert({
          method: "email",
          contact: subscription.contact,
          alertType: alertData.alert_type,
          location: alertData.location,
          description: alertData.description,
          severity: alertData.severity,
          water_levels: alertData.water_levels,
          evacuation_routes: alertData.evacuation_routes,
          emergency_contacts: alertData.emergency_contacts,
          precautionary_measures: alertData.precautionary_measures,
          weather_forecast: alertData.weather_forecast,
          timeSent: new Date().toISOString(),
          status: "success",
        });
      } catch (error) {
        console.error('Error sending email alerts:', error);

        // Log the failed email alert
        logAlert({
          method: "email",
          contact: subscription.contact,
          alertType: alertData.alert_type,
          location: alertData.location,
          description: alertData.description,
          severity: alertData.severity,
          water_levels: alertData.water_levels,
          evacuation_routes: alertData.evacuation_routes,
          emergency_contacts: alertData.emergency_contacts,
          precautionary_measures: alertData.precautionary_measures,
          weather_forecast: alertData.weather_forecast,
          timeSent: new Date().toISOString(),
          status: "failed",
        });
      }
    }

    setIsEmailLoading((prev) => ({ ...prev, [location]: false })); // Reset loading state
    alert(`Email alerts sent successfully for ${location}!`);
  };

  // Send SMS alerts with logging
 const handleSendSmsAlert = async (location: string) => {
  setIsSmsLoading((prev) => ({ ...prev, [location]: true })); // Set loading state

  const alertData = await fetchAlertData(location);
  if (!alertData) {
    alert(`No active alert found for ${location}.`);
    setIsSmsLoading((prev) => ({ ...prev, [location]: false })); // Reset loading state
    return;
  }

  // Updated message formatting
  const message = `
🚨 *Flood Alert for ${location}* 🚨

*Type:* ${alertData.alert_type}
*Severity:* ${alertData.severity}
*Location:* ${alertData.location}

*Description:*
${alertData.description}

*Water Levels:*
- Current: ${alertData.water_levels.current}
- Predicted (24h): ${alertData.water_levels.predicted}

*Evacuation Routes:*
${alertData.evacuation_routes.join('\n')}

*Emergency Contacts:*
${alertData.emergency_contacts.join('\n')}

*Precautionary Measures:*
${alertData.precautionary_measures.join('\n')}

*Weather Forecast:*
- Next 24 Hours: ${alertData.weather_forecast.next_24_hours}
- Next 48 Hours: ${alertData.weather_forecast.next_48_hours}

*Status:* ${alertData.status}
*Last Updated:* ${new Date(alertData.updatedAt).toLocaleString()}
`;

  const subscriptions = subscriptionsByLocation[location].filter((sub) => sub.method === 'sms');
  for (const subscription of subscriptions) {
    try {
      // Send SMS using the TextSMS API
      const response = await axios.post('http://localhost:3000/api/send-sms', {
        to: subscription.contact,
        message: message,
      });

      // Log the SMS alert
      logAlert({
        method: "sms",
        contact: subscription.contact,
        alertType: alertData.alert_type,
        location: alertData.location,
        description: alertData.description,
        severity: alertData.severity,
        water_levels: alertData.water_levels,
        evacuation_routes: alertData.evacuation_routes,
        emergency_contacts: alertData.emergency_contacts,
        precautionary_measures: alertData.precautionary_measures,
        weather_forecast: alertData.weather_forecast,
        timeSent: new Date().toISOString(),
        status: "success",
      });
    } catch (error) {
      console.error('Error sending SMS alerts:', error);

      // Log the failed SMS alert
      logAlert({
        method: "sms",
        contact: subscription.contact,
        alertType: alertData.alert_type,
        location: alertData.location,
        description: alertData.description,
        severity: alertData.severity,
        water_levels: alertData.water_levels,
        evacuation_routes: alertData.evacuation_routes,
        emergency_contacts: alertData.emergency_contacts,
        precautionary_measures: alertData.precautionary_measures,
        weather_forecast: alertData.weather_forecast,
        timeSent: new Date().toISOString(),
        status: "failed",
      });
    }
  }

  setIsSmsLoading((prev) => ({ ...prev, [location]: false })); // Reset loading state
  alert(`SMS alerts sent successfully for ${location}!`);
};
const confirmSendAlert = (type: 'email' | 'sms', location: string) => {
  toast(`Confirm ${type.toUpperCase()} alert for ${location}?`, {
    action: {
      label: 'Send',
      onClick: () => type === 'email' 
        ? handleSendEmailAlert(location)
        : handleSendSmsAlert(location)
    },
    cancel: { 
      label: 'Cancel',
      onClick: () => {} // Add empty onClick handler
    }
  });
};
return (
  <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
    <div className="max-w-7xl mx-auto p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Alert Management Console</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode 
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white text-gray-800 border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="dark-mode" 
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div 
          className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
          whileHover={{ y: -2 }}
        >
          <h3 className="text-sm text-gray-500">Locations</h3>
          <p className="text-2xl font-bold">{Object.keys(subscriptionsByLocation).length}</p>
        </motion.div>
        {/* Add similar cards for other stats */}
      </div>

      {/* Location Cards */}
      <AnimatePresence>
        {filteredLocations.map(([location, subscriptions], idx) => (
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className={`mb-6 rounded-xl shadow-lg ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              {/* Location Header */}
              <div className={`p-4 border-b ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-6 w-6 text-blue-500" />
                  <h2 className="text-xl font-semibold">{location}</h2>
                </div>
                <div className="flex space-x-2">
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Last sent: {sentAlerts[location]?.timestamp || 'Never'}
                  </span>
                </div>
              </div>

              {/* Subscription Sections */}
              <div className="p-6 space-y-6">
                {/* Email Section */}
                {subscriptions.some(s => s.method === 'email') && (
                  <Section 
                    title="Email Subscriptions" 
                    icon={<EnvelopeIcon className="h-5 w-5 text-blue-500" />}
                    darkMode={darkMode}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">
                          {subscriptions.filter(s => s.method === 'email').length} Subscribers
                        </h4>
                        <button
                          onClick={() => confirmSendAlert('email', location)}
                          disabled={isEmailLoading[location]}
                          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                            isEmailLoading[location]
                              ? 'bg-blue-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          } text-white transition-colors`}
                        >
                          {isEmailLoading[location] ? (
                            <ClipLoader size={20} color="#ffffff" />
                          ) : (
                            <>
                              <EnvelopeIcon className="h-5 w-5" />
                              <span>Send Email Alert</span>
                            </>
                          )}
                        </button>
                      </div>
                      <SubscriptionTable 
                        subscriptions={subscriptions.filter(s => s.method === 'email')} 
                        darkMode={darkMode}
                      />
                    </div>
                  </Section>
                )}

                {/* SMS Section */}
                {subscriptions.some(s => s.method === 'sms') && (
                  <Section 
                    title="SMS Subscriptions" 
                    icon={<DevicePhoneMobileIcon className="h-5 w-5 text-green-500" />}
                    darkMode={darkMode}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">
                          {subscriptions.filter(s => s.method === 'sms').length} Subscribers
                        </h4>
                        <div className="flex items-center space-x-4">
                          <div className={`px-3 py-1 rounded-full ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <span className="text-sm">
                              Cost Estimate: KES {subscriptions.filter(s => s.method === 'sms').length * 2}
                            </span>
                          </div>
                          <button
                            onClick={() => confirmSendAlert('sms', location)}
                            disabled={isSmsLoading[location]}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                              isSmsLoading[location]
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700'
                            } text-white transition-colors`}
                          >
                            {isSmsLoading[location] ? (
                              <ClipLoader size={20} color="#ffffff" />
                            ) : (
                              <>
                                <DevicePhoneMobileIcon className="h-5 w-5" />
                                <span>Send SMS Alert</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <SubscriptionTable 
                        subscriptions={subscriptions.filter(s => s.method === 'sms')} 
                        darkMode={darkMode}
                      />
                    </div>
                  </Section>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);
};

// Helper Components
const Section: React.FC<{ 
title: string; 
icon: React.ReactNode;
darkMode: boolean;
children: React.ReactNode;
}> = ({ title, icon, darkMode, children }) => (
<div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
  <div className="flex items-center space-x-2 mb-4">
    {icon}
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
  {children}
</div>
);

const SubscriptionTable: React.FC<{ 
subscriptions: Subscription[]; 
darkMode: boolean;
}> = ({ subscriptions, darkMode }) => (
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className={`${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
        <th className="px-4 py-3 text-left text-sm font-medium">Contact</th>
        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
        <th className="px-4 py-3 text-left text-sm font-medium">Last Sent</th>
      </tr>
    </thead>
    <tbody>
      {subscriptions.map((subscription) => (
        <tr 
          key={subscription.id} 
          className={`border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
        >
          <td className="px-4 py-3">{subscription.contact}</td>
          <td className="px-4 py-3">
            <div className="flex items-center space-x-2">
              {Math.random() > 0.1 ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              ) : (
                <XCircleIcon className="h-4 w-4 text-red-500" />
              )}
              <span>{Math.random() > 0.1 ? 'Delivered' : 'Failed'}</span>
            </div>
          </td>
          <td className="px-4 py-3">2h ago</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);

export default SubscriptionList;