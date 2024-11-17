import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, MapPin, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [highRiskAreas, setHighRiskAreas] = useState<number>(0); // Replace with actual structure if needed
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
      .then(response => setHighRiskAreas(response.data.length)) // Adjust based on response structure
      .catch(error => console.error('Error fetching high-risk areas:', error));

    // Fetch safe routes
    axios.get('http://localhost:3000/safe-routes')
      .then(response => setSafeRoutes(response.data))
      .catch(error => console.error('Error fetching safe routes:', error));

    // Fetch community reports
    axios.get('http://localhost:3000/community-reports')
      .then(response => {
        setCommunityReports(response.data);
        // Extract recent 3 reports
        setRecentAlerts(response.data.slice(0, 5));
      })
      .catch(error => console.error('Error fetching community reports:', error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="container py-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alerts.length}</div>
                <p className="text-xs text-muted-foreground">+2 since last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High-Risk Areas</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highRiskAreas}</div>
                <p className="text-xs text-muted-foreground">2 new areas identified</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Reports</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communityReports.length}</div>
                <p className="text-xs text-muted-foreground">+12 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Safe Routes</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{safeRoutes.length}</div>
                <p className="text-xs text-muted-foreground">Updated 5 mins ago</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 bg-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-semibold">{alert.alert_type}</h3>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-4">Recently</span>
                    <Button variant="outline" size="sm">View Details</Button>
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
