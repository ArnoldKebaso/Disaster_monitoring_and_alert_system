import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent } from './ui/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Healthcare {
  facility_id: number;
  name: string;
  location: string;
  capacity: number;
  contact_number: string;
  resources_available: { medicines: string[]; ambulances: number };
}

const HealthcareComponent: React.FC = () => {
  const [healthcareData, setHealthcareData] = useState<Healthcare[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthcare = async () => {
      try {
        const response = await axios.get('http://localhost:3000/healthcare');
        setHealthcareData(response.data);
      } catch (error) {
        console.error('Error fetching healthcare data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthcare();
  }, []);

  if (loading) {
    return <div>Loading healthcare facilities...</div>;
  }

  const chartData = {
    labels: healthcareData.map((facility) => facility.name),
    datasets: [
      {
        label: 'Capacity (Beds)',
        data: healthcareData.map((facility) => facility.capacity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ambulances',
        data: healthcareData.map((facility) => facility.resources_available.ambulances),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Healthcare Facilities Overview',
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Healthcare Facilities</h1>

      <div className="mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {healthcareData.map((facility) => (
          <Card key={facility.facility_id} className="border rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
              <p className="font-semibold">Location: {facility.location}</p>
              <p>Capacity: {facility.capacity} beds</p>
              <p>Contact: {facility.contact_number}</p>
              <p className="mt-2">
                <span className="font-semibold">Resources Available:</span>
              </p>
              <ul className="list-disc pl-5">
                <li>Medicines: {facility.resources_available.medicines.join(', ')}</li>
                <li>Ambulances: {facility.resources_available.ambulances}</li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthcareComponent;
