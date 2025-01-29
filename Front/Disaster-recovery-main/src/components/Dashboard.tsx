import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, MapPin, Users } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Alert {
  alert_type: string;
  severity: string;
  location: string;
  description: string;
  status: string;
}

interface Route {
  route_id: number;
  start_location: string;
  end_location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [highRiskAreas, setHighRiskAreas] = useState<number>(0);
  const [safeRoutes, setSafeRoutes] = useState<Route[]>([]);
  const [communityReports, setCommunityReports] = useState<Alert[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Fetch alerts
    axios.get('http://localhost:3000/alerts')
        .then(response => setAlerts(response.data))
        .catch(error => console.error('Error fetching alerts:', error));

    // Fetch high-risk areas
    axios.get('http://localhost:3000/high-risk-areas')
        .then(response => setHighRiskAreas(response.data.length))
        .catch(error => console.error('Error fetching high-risk areas:', error));

    // Fetch safe routes
    axios.get('http://localhost:3000/safe-routes')
        .then(response => setSafeRoutes(response.data))
        .catch(error => console.error('Error fetching safe routes:', error));

    // Fetch community reports
    axios.get('http://localhost:3000/community-reports')
        .then(response => {
          setCommunityReports(response.data);
          setRecentAlerts(response.data.slice(0, 5));
        })
        .catch(error => console.error('Error fetching community reports:', error));
  }, []);

  return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-1 container mx-auto px-6 py-8 max-w-6xl">
          <div className="py-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 mb-6">FMAS Dashboard</h1>

            {/* Statistics Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-md transition-transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-700">Active Alerts</CardTitle>
                  <Bell className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{alerts.length}</div>
                  <p className="text-sm text-gray-600">+2 since last hour</p>
                </CardContent>
              </Card>

              <Card className="shadow-md transition-transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-700">High-Risk Areas</CardTitle>
                  <MapPin className="h-5 w-5 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{highRiskAreas}</div>
                  <p className="text-sm text-gray-600">2 new areas identified</p>
                </CardContent>
              </Card>

              <Card className="shadow-md transition-transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-700">Community Reports</CardTitle>
                  <Users className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{communityReports.length}</div>
                  <p className="text-sm text-gray-600">+12 from yesterday</p>
                </CardContent>
              </Card>

              <Card className="shadow-md transition-transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-700">Safe Routes</CardTitle>
                  <MapPin className="h-5 w-5 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{safeRoutes.length}</div>
                  <p className="text-sm text-gray-600">Updated 5 mins ago</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts Section */}
            <div className="mt-10 bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Alerts</h2>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm transition-transform hover:scale-105"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-700">{alert.alert_type}</h3>
                        <p className="text-sm text-gray-600">{alert.location}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">Recently</span>
                        <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-100">
                          View Details
                        </Button>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default Dashboard;