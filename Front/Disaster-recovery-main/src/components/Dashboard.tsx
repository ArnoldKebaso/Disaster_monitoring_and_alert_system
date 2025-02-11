import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, MapPin, Users, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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

interface CommunityReport {
  report_id: number;
  report_type: string;
  location: string;
  description: string;
  image_url: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  user_id: string | null;
  User: any | null;
}

const Dashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [highRiskAreas, setHighRiskAreas] = useState<number>(0);
  const [safeRoutes, setSafeRoutes] = useState<Route[]>([]);
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<CommunityReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<CommunityReport | null>(null); // Track the selected report for details

  useEffect(() => {
    // Fetch alerts
    axios
      .get('http://localhost:3000/alerts')
      .then((response) => setAlerts(response.data))
      .catch((error) => console.error('Error fetching alerts:', error));

    // Fetch high-risk areas
    axios
      .get('http://localhost:3000/high-risk-areas')
      .then((response) => setHighRiskAreas(response.data.length))
      .catch((error) => console.error('Error fetching high-risk areas:', error));

    // Fetch safe routes
    axios
      .get('http://localhost:3000/safe-routes')
      .then((response) => setSafeRoutes(response.data))
      .catch((error) => console.error('Error fetching safe routes:', error));

    // Fetch community reports
    axios
      .get('http://localhost:3000/community-reports')
      .then((response) => {
        setCommunityReports(response.data);
        setRecentAlerts(response.data.slice(0, 5));
      })
      .catch((error) => console.error('Error fetching community reports:', error));
  }, []);

  const handleViewDetails = (report: CommunityReport) => {
    setSelectedReport(report); // Set the selected report to show details
  };

  const closeDetailsModal = () => {
    setSelectedReport(null); // Close the modal
  };

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
              {recentAlerts.map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm transition-transform hover:scale-105"
                >
                  <div>
                    <h3 className="font-semibold text-gray-700">{report.report_type}</h3>
                    <p className="text-sm text-gray-600">{report.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">Recently</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500 text-blue-500 hover:bg-blue-100"
                      onClick={() => handleViewDetails(report)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Report Details</h2>
              <Button
                onClick={closeDetailsModal}
                className="text-gray-500 hover:text-gray-700"
                variant="ghost"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                <span className="font-bold">Report ID:</span> {selectedReport.report_id}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Report Type:</span> {selectedReport.report_type}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Location:</span> {selectedReport.location}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Description:</span> {selectedReport.description}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Status:</span> {selectedReport.status}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Created At:</span>{' '}
                {new Date(selectedReport.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Updated At:</span>{' '}
                {new Date(selectedReport.updatedAt).toLocaleString()}
              </p>
              {selectedReport.image_url && (
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Image URL:</span> {selectedReport.image_url}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;