import React from 'react';
import { Bell, MapPin, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Dashboard: React.FC = () => {
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
                <div className="text-2xl font-bold">3</div>
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
                <div className="text-2xl font-bold">7</div>
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
                <div className="text-2xl font-bold">24</div>
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
              {[
                { type: 'Flood Warning', location: 'Riverside County', time: '10 minutes ago' },
                { type: 'Earthquake Alert', location: 'San Francisco Bay Area', time: '1 hour ago' },
                { type: 'Wildfire Risk', location: 'Southern California', time: '3 hours ago' },
              ].map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-semibold">{alert.type}</h3>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-4">{alert.time}</span>
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