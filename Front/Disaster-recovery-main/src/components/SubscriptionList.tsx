// src/components/SubscriptionList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Subscribed Users by Location</h1>
      {Object.entries(subscriptionsByLocation).map(([location, subscriptions]) => (
        <div key={location} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{location}</h2>
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Contact</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b">
                  <td className="px-4 py-2 text-center">{subscription.id}</td>
                  <td className="px-4 py-2 text-center">{subscription.method}</td>
                  <td className="px-4 py-2 text-center">{subscription.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionList;