// DemographicComponent.tsx
// This component displays demographic data for various regions.
// Features include:
// - Fetching demographic data from the backend.
// - Displaying population density, age distribution, and vulnerable population statistics.
// - Visualizing age distribution using a pie chart.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from './ui/card';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

// Interface defining the structure of a demographic record
interface Demographic {
  demographic_id: number; // Unique ID for the demographic record
  region: string; // Name of the region
  population_density: number; // Population density in people per km²
  age_distribution: { children: number; adults: number; seniors: number }; // Age distribution percentages
  vulnerable_population: { disabilities: number; low_income: number }; // Vulnerable population percentages
}

const DemographicComponent: React.FC = () => {
  // State to store demographic data
  const [demographics, setDemographics] = useState<Demographic[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch demographic data when the component mounts
  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/demographics');
        setDemographics(response.data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching demographics:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDemographics();
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <div>Loading demographics...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Demographic Data</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Render demographic cards */}
        {demographics.map((demographic) => (
          <Card key={demographic.demographic_id} className="border rounded-lg overflow-hidden">
            <CardContent className="p-4">
              {/* Region Name */}
              <h3 className="text-xl font-bold mb-2">{demographic.region}</h3>
              {/* Population Density */}
              <p className="font-semibold">Population Density: {demographic.population_density} people/km²</p>
              <div className="mt-4">
                {/* Age Distribution Pie Chart */}
                <h4 className="font-semibold mb-2">Age Distribution:</h4>
                <Pie
                  data={{
                    labels: ['Children', 'Adults', 'Seniors'],
                    datasets: [
                      {
                        label: 'Age Distribution',
                        data: [
                          demographic.age_distribution.children,
                          demographic.age_distribution.adults,
                          demographic.age_distribution.seniors,
                        ],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for the chart
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Hover colors
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom', // Position of the legend
                      },
                    },
                  }}
                />
              </div>
              <div className="mt-4">
                {/* Vulnerable Population Details */}
                <h4 className="font-semibold mb-2">Vulnerable Population:</h4>
                <p>Disabilities: {demographic.vulnerable_population.disabilities}%</p>
                <p>Low Income: {demographic.vulnerable_population.low_income}%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemographicComponent;
