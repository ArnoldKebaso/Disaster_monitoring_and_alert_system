// HealthcareComponent.tsx
// This component displays an overview of healthcare facilities.
// Features include:
// - Fetching healthcare data from the backend.
// - Displaying facility details such as location, capacity, and resources.
// - Visualizing facility capacity and ambulance availability using a bar chart.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent } from './ui/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Interface defining the structure of a healthcare facility record
interface Healthcare {
  facility_id: number; // Unique ID for the healthcare facility
  name: string; // Name of the facility
  location: string; // Location of the facility
  capacity: number; // Number of beds available
  contact_number: string; // Contact number for the facility
  resources_available: { medicines: string[]; ambulances: number }; // Available resources
}

const HealthcareComponent: React.FC = () => {
  // State to store healthcare data
  const [healthcareData, setHealthcareData] = useState<Healthcare[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch healthcare data when the component mounts
  useEffect(() => {
    const fetchHealthcare = async () => {
      try {
        const response = await axios.get('http://localhost:3000/healthcare');
        setHealthcareData(response.data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching healthcare data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchHealthcare();
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <div>Loading healthcare facilities...</div>;
  }

  // Prepare data for the bar chart
  const chartData = {
    labels: healthcareData.map((facility) => facility.name), // Facility names as labels
    datasets: [
      {
        label: 'Capacity (Beds)', // Dataset for bed capacity
        data: healthcareData.map((facility) => facility.capacity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ambulances', // Dataset for ambulance availability
        data: healthcareData.map((facility) => facility.resources_available.ambulances),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options for customization
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Position of the legend
      },
      title: {
        display: true,
        text: 'Healthcare Facilities Overview', // Chart title
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Healthcare Facilities</h1>

      {/* Bar Chart */}
      <div className="mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Facility Details */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {healthcareData.map((facility) => (
          <Card key={facility.facility_id} className="border rounded-lg overflow-hidden">
            <CardContent className="p-4">
              {/* Facility Name */}
              <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
              {/* Facility Details */}
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
