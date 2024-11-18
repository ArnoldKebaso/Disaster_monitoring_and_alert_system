import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Flood {
  flood_id: number;
  location: string;
  water_level: number;
  date_recorded: string;
  status: string;
}

const FloodComponent: React.FC = () => {
  const [floodData, setFloodData] = useState<Flood[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFloods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/floods');
        setFloodData(response.data);
      } catch (error) {
        console.error('Error fetching flood data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFloods();
  }, []);

  if (loading) {
    return <div>Loading flood data...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Flood Data Visualization</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Flood ID</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Water Level (m)</th>
              <th className="border border-gray-300 px-4 py-2">Date Recorded</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {floodData.map((flood) => (
              <tr key={flood.flood_id}>
                <td className="border border-gray-300 px-4 py-2">{flood.flood_id}</td>
                <td className="border border-gray-300 px-4 py-2">{flood.location}</td>
                <td className="border border-gray-300 px-4 py-2">{flood.water_level}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(flood.date_recorded).toLocaleString()}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    flood.status === 'critical'
                      ? 'text-red-500 font-bold'
                      : flood.status === 'alert'
                      ? 'text-orange-500 font-bold'
                      : 'text-green-500 font-bold'
                  }`}
                >
                  {flood.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FloodComponent;
