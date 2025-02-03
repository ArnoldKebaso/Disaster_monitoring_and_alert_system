import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EnvelopeIcon, DevicePhoneMobileIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface Subscription {
  id: number;
  method: string;
  contact: string;
}

const SubscriptionList: React.FC = () => {
  const [subscriptionsByLocation, setSubscriptionsByLocation] = useState<{ [key: string]: Subscription[] }>({});

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/subscriptions/by-location');
      setSubscriptionsByLocation(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleSendEmailAlert = async (location: string) => {
    const subject = `Flood Alert for ${location}`;
    const text = `This is a flood alert for ${location}. Please take necessary precautions.`;

    try {
      const subscriptions = subscriptionsByLocation[location].filter((sub) => sub.method === 'email');
      for (const subscription of subscriptions) {
        await axios.post('http://localhost:3000/subscriptions/send-email', {
          to: subscription.contact,
          subject,
          text,
        });
      }
      alert(`Email alerts sent successfully for ${location}!`);
    } catch (error) {
      console.error('Error sending email alerts:', error);
      alert('Failed to send email alerts.');
    }
  };

  const handleSendSmsAlert = async (location: string) => {
    const message = `This is a flood alert for ${location}. Please take necessary precautions.`;

    try {
      const subscriptions = subscriptionsByLocation[location].filter((sub) => sub.method === 'sms');
      for (const subscription of subscriptions) {
        // Replace with your SMS API logic
        console.log(`Sending SMS to ${subscription.contact}: ${message}`);
      }
      alert(`SMS alerts sent successfully for ${location}!`);
    } catch (error) {
      console.error('Error sending SMS alerts:', error);
      alert('Failed to send SMS alerts.');
    }
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
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                      >
                        <EnvelopeIcon className="h-5 w-5" />
                        <span>Send Email Alert</span>
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
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center space-x-2"
                      >
                        <DevicePhoneMobileIcon className="h-5 w-5" />
                        <span>Send SMS Alert</span>
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
    </div>
  );
};

export default SubscriptionList;