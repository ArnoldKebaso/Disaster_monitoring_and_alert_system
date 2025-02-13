import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EnvelopeIcon, DevicePhoneMobileIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { ClipLoader } from 'react-spinners'; // Import the loading spinner

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

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/subscriptions/by-location');
      setSubscriptionsByLocation(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
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

    const message = `
      Flood Alert for ${location}:
      Type: ${alertData.alert_type}
      Severity: ${alertData.severity}
      Description: ${alertData.description}
      Water Levels: Current - ${alertData.water_levels.current}, Predicted - ${alertData.water_levels.predicted}
      Evacuation Routes: ${alertData.evacuation_routes.join(', ')}
      Emergency Contacts: ${alertData.emergency_contacts.join(', ')}
      Precautionary Measures: ${alertData.precautionary_measures.join(', ')}
      Weather Forecast: Next 24 Hours - ${alertData.weather_forecast.next_24_hours}, Next 48 Hours - ${alertData.weather_forecast.next_48_hours}
      Status: ${alertData.status}
      Last Updated: ${new Date(alertData.updatedAt).toLocaleString()}
    `;

    const subscriptions = subscriptionsByLocation[location].filter((sub) => sub.method === 'sms');
    for (const subscription of subscriptions) {
      try {
        // Replace with your SMS API logic
        console.log(`Sending SMS to ${subscription.contact}: ${message}`);

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


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Subscribed Users by Location</h1>
      <div className="space-y-6">
        {Object.entries(subscriptionsByLocation).map(([location, subscriptions]) => {
          const emailSubscriptions = subscriptions.filter((sub) => sub.method === 'email');
          const smsSubscriptions = subscriptions.filter((sub) => sub.method === 'sms');

          return (
            <div key={location} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800">{location}</h2>
                </div>
              </div>
              <div className="p-6">
                {/* Email Subscriptions */}
                {emailSubscriptions.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">Email Subscriptions</h3>
                      <button
                        onClick={() => handleSendEmailAlert(location)}
                        disabled={isEmailLoading[location]} // Disable button during loading
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                      >
                        {isEmailLoading[location] ? (
                          <ClipLoader size={20} color="#ffffff" /> // Show spinner when loading
                        ) : (
                          <>
                            <EnvelopeIcon className="h-5 w-5" />
                            <span>Send Email Alert</span>
                          </>
                        )}
                      </button>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Method</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailSubscriptions.map((subscription) => (
                          <tr key={subscription.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                            <td className="px-4 py-3 text-sm text-gray-700">{subscription.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              <div className="flex items-center space-x-2">
                                <EnvelopeIcon className="h-4 w-4 text-blue-600" />
                                <span>{subscription.method}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">{subscription.contact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* SMS Subscriptions */}
                {smsSubscriptions.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">SMS Subscriptions</h3>
                      <button
                        onClick={() => handleSendSmsAlert(location)}
                        disabled={isSmsLoading[location]} // Disable button during loading
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center space-x-2"
                      >
                        {isSmsLoading[location] ? (
                          <ClipLoader size={20} color="#ffffff" /> // Show spinner when loading
                        ) : (
                          <>
                            <DevicePhoneMobileIcon className="h-5 w-5" />
                            <span>Send SMS Alert</span>
                          </>
                        )}
                      </button>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Method</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {smsSubscriptions.map((subscription) => (
                          <tr key={subscription.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                            <td className="px-4 py-3 text-sm text-gray-700">{subscription.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              <div className="flex items-center space-x-2">
                                <DevicePhoneMobileIcon className="h-4 w-4 text-green-600" />
                                <span>{subscription.method}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">{subscription.contact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Display Logs */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Alert Logs</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Method</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Contact</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Alert Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time Sent</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-3 text-sm text-gray-700">{log.method}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{log.contact}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{log.alertType}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{log.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{new Date(log.timeSent).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionList;