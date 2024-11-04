import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Define the Alert interface
interface Alert {
  id: number;
  type: string;
  location: string;
  severity: string;
  description: string;
  status: string;
}

const DashboardPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]); // Use the hook

  // Fetch data using Axios inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/alerts/'); // Update with your API endpoint
        setAlerts(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchData();
  }, []); // Empty array ensures useEffect runs only once

  return (
    <div>
      <h2>Disaster Alerts</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>{alert.description} - {alert.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
