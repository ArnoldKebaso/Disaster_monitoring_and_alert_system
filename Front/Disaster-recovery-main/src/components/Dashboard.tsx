import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Bell, MapPin, AlertTriangle, Users } from 'lucide-react';
// import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Report {
  report_id: number;
  report_type: string;
  location: string;
  description: string;
  status: string;
  image_url?: string;
}

const Dashboard: React.FC = () => {
  const [communityReports, setCommunityReports] = useState<Report[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<number>(0);
  const [highRiskAreas, setHighRiskAreas] = useState<number>(0);
  const [recentAlerts, setRecentAlerts] = useState<Report[]>([]);

  useEffect(() => {
    // Fetch community reports
    const fetchReports = async () => {
      try {
        const response = await axios.get<Report[]>('http://localhost:3000/community-reports');
        const reports = response.data;
        
        setCommunityReports(reports);
        
        // Example counts based on fetched data
        setActiveAlerts(reports.filter(report => report.status === 'pending').length);
        setHighRiskAreas(reports.filter(report => report.report_type === 'High Risk').length);
        setRecentAlerts(reports.slice(0, 3));  // Show only the 3 most recent alerts for example
      } catch (error) {
        console.error("Error fetching community reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="container py-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Alerts
                </CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeAlerts}</div>
                <p className="text-xs text-muted-foreground">
                  +2 since last hour
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  High-Risk Areas
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highRiskAreas}</div>
                <p className="text-xs text-muted-foreground">
                  2 new areas identified
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Community Reports
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{communityReports.length}</div>
                <p className="text-xs text-muted-foreground">
                  +12 from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Safe Routes
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  Updated 5 mins ago
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 bg-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.report_id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-semibold">{alert.report_type}</h3>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-4">{alert.description}</span>
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
