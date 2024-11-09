import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Fetch disaster reports
    axios.get('/api/reports').then((response) => {
      setReports(response.data);
    }).catch((error) => {
      console.error('Error fetching reports:', error);
    });

    // Fetch real-time disaster alerts
    axios.get('/api/alerts').then((response) => {
      setAlerts(response.data.features);
    }).catch((error) => {
      console.error('Error fetching alerts:', error);
    });

    // Fetch weather data for a specific location
    axios.get('/api/weather/London').then((response) => {
      setWeather(response.data);
    }).catch((error) => {
      console.error('Error fetching weather:', error);
    });
  }, []);

  return (
    <div>
      <h1>Disaster Dashboard</h1>
      {/* Render reports, alerts, and weather data */}
    </div>
  );
};

export default Dashboard;
