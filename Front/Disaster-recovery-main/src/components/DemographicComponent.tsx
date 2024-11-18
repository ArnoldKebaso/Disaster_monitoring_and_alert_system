import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from './ui/card';
import { Pie } from 'react-chartjs-2';
//import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface Demographic {
  demographic_id: number;
  region: string;
  population_density: number;
  age_distribution: { children: number; adults: number; seniors: number };
  vulnerable_population: { disabilities: number; low_income: number };
}

const DemographicComponent: React.FC = () => {
  const [demographics, setDemographics] = useState<Demographic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/demographics');
        setDemographics(response.data);
      } catch (error) {
        console.error('Error fetching demographics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDemographics();
  }, []);

  if (loading) {
    return <div>Loading demographics...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Demographic Data</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demographics.map((demographic) => (
          <Card key={demographic.demographic_id} className="border rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">{demographic.region}</h3>
              <p className="font-semibold">Population Density: {demographic.population_density} people/km²</p>
              <div className="mt-4">
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
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
              <div className="mt-4">
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
