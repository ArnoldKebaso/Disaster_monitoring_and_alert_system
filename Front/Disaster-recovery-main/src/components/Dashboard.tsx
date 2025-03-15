import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, MapPin, Users, X, AlertTriangle, Route, ClipboardList } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Progress } from './ui/progress';


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
  User: {
    username: string;
    email: string;
  } | null;
}

const Dashboard: React.FC = () => {
const [alerts, setAlerts] = useState<Alert[]>([]);
  

  const [highRiskAreas, setHighRiskAreas] = useState<number>(8); // Hardcoded value
  const [safeRoutes, setSafeRoutes] = useState<Route[]>([ // Hardcoded data
    {
      route_id: 1,
      start_location: "Nairobi CBD",
      end_location: "Westlands",
      description: "Safe bypass through Mombasa Road",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      route_id: 2,
      start_location: "Thika",
      end_location: "Ruiru",
      description: "Alternative route via Eastern Bypass",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    }
  ]);
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<CommunityReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<CommunityReport | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  


  const handlePageChange = (newPage: number) => {
    axios
      .get('http://localhost:3000/community-reports', {
        params: {
          page: newPage,
          limit: 6,
          sort: 'desc'
        }
      })
      .then((response) => {
        setCommunityReports(response.data.reports);
        setRecentAlerts(response.data.reports);
        setTotalPages(response.data.totalPages);
        setCurrentPage(newPage);
      });
  };  
  
  
  // useEffect(() => {
  //   // Fetch alerts
  //   axios
  //     .get('http://localhost:3000/alerts')
  //     .then((response) => setAlerts(response.data))
  //     .catch((error) => console.error('Error fetching alerts:', error));

  //   // Fetch high-risk areas
  //   axios
  //     .get('http://localhost:3000/high-risk-areas')
  //     .then((response) => setHighRiskAreas(response.data.length))
  //     .catch((error) => console.error('Error fetching high-risk areas:', error));

  //   // Fetch safe routes
  //   axios
  //     .get('http://localhost:3000/safe-routes')
  //     .then((response) => setSafeRoutes(response.data))
  //     .catch((error) => console.error('Error fetching safe routes:', error));

  //   // Fetch community reports
  //   axios
  //     .get('http://localhost:3000/community-reports', {
  //       params: {
  //         limit: 6,
  //         sort: 'desc'
  //       }
  //     })
  //     .then((response) => {
  //       setCommunityReports(response.data);
  //       setRecentAlerts(response.data);
  //     })


  // }, []);
  useEffect(() => {
    // Fetch alerts
    axios.get('http://localhost:3000/alerts')
      .then((response) => setAlerts(response.data))
      .catch((error) => console.error('Error fetching alerts:', error));

    // Fetch community reports with pagination
    axios.get('http://localhost:3000/community-reports', {
      params: {
        page: currentPage,
        limit: 6,
        sort: 'desc'
      }
    })
    .then((response) => {
      setCommunityReports(response.data.reports);
      setRecentAlerts(response.data.reports);
      setTotalPages(response.data.totalPages);
    })
    .catch((error) => console.error('Error fetching community reports:', error));

    // Hardcoded high risk areas
    setHighRiskAreas(8); // Static value for demonstration

    // Hardcoded safe routes
    setSafeRoutes([
      {
        route_id: 1,
        start_location: "Nairobi CBD",
        end_location: "Westlands",
        description: "Safe bypass through Mombasa Road",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01"
      },
      {
        route_id: 2,
        start_location: "Thika",
        end_location: "Ruiru",
        description: "Alternative route via Eastern Bypass",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01"
      }
    ]);
  }, [currentPage]);

  const handleViewDetails = (report: CommunityReport) => {
    setSelectedReport(report); // Set the selected report to show details
  };

  const closeDetailsModal = () => {
    setSelectedReport(null); // Close the modal
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
    <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Flood Management Dashboard
          </h1>
          <p className="text-muted-foreground">Real-time flood monitoring and management system</p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Active Alerts Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="relative overflow-hidden border border-blue-100/50 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground/80">Active Alerts</CardTitle>
                <div className="p-2 rounded-full bg-blue-100/50">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{alerts.length}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={(alerts.length / 20) * 100} className="h-2 bg-blue-100/50" />
                  <span className="text-sm text-muted-foreground">+2 since last hour</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* High Risk Areas Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="relative overflow-hidden border border-red-100/50 bg-gradient-to-br from-red-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground/80">High Risk Areas</CardTitle>
                <div className="p-2 rounded-full bg-red-100/50">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{highRiskAreas}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={(highRiskAreas / 15) * 100} className="h-2 bg-red-100/50" />
                  <span className="text-sm text-muted-foreground">+3 this week</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Safe Routes Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="relative overflow-hidden border border-green-100/50 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground/80">Safe Routes</CardTitle>
                <div className="p-2 rounded-full bg-green-100/50">
                  <Route className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{safeRoutes.length}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={(safeRoutes.length / 10) * 100} className="h-2 bg-green-100/50" />
                  <span className="text-sm text-muted-foreground">+1 new today</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Community Reports Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="relative overflow-hidden border border-purple-100/50 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground/80">Community Reports</CardTitle>
                <div className="p-2 rounded-full bg-purple-100/50">
                  <ClipboardList className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{communityReports.length}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={(communityReports.length / 50) * 100} className="h-2 bg-purple-100/50" />
                  <span className="text-sm text-muted-foreground">+5 today</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Recent Alerts</h2>
            <Button variant="ghost" className="text-blue-600">
              View All →
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentAlerts.map((report) => (
              <motion.div
                key={report.report_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="group relative overflow-hidden border border-muted-foreground/20 hover:border-blue-500/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-blue-100/50">
                        <AlertTriangle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">{report.report_type}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{report.location}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Reported by: {report.User?.username || 'Unknown'}
                          <br />
                          {report.User?.email || 'No email provided'}
                        </div>
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full mt-2",
                          report.status === 'Verified' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        )}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full mt-4 text-blue-600 hover:text-blue-700"
                      onClick={() => handleViewDetails(report)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </motion.div>
      </div>
    </main>

    {/* Details Modal */}
    {selectedReport && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-background rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-muted-foreground/20"
        >
          <CardHeader className="border-b border-muted-foreground/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Report Details</CardTitle>
              <Button
                onClick={closeDetailsModal}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <DetailItem label="Report ID" value={selectedReport.report_id} />
                <DetailItem label="Type" value={selectedReport.report_type} />
                <DetailItem label="Location" value={selectedReport.location} />
                <DetailItem 
                  label="Reported By" 
                  value={selectedReport.User?.username || 'Anonymous User'} 
                />
              </div>
              <div className="space-y-2">
                <DetailItem label="Status" value={selectedReport.status} />
                <DetailItem 
                  label="User Email" 
                  value={selectedReport.User?.email || 'No email provided'} 
                />
                <DetailItem 
                  label="Created At" 
                  value={new Date(selectedReport.createdAt).toLocaleString()} 
                />
                <DetailItem 
                  label="Updated At" 
                  value={new Date(selectedReport.updatedAt).toLocaleString()} 
                />
              </div>
            </div>

            <Section title="Description">
              <p className="text-foreground/90">{selectedReport.description}</p>
            </Section>

            {selectedReport.image_url && (
              <Section title="Evidence Photo">
                <img
                  src={selectedReport.image_url}
                  alt="Report evidence"
                  className="rounded-lg border border-muted-foreground/20 max-h-96 object-contain"
                />
              </Section>
            )}
          </CardContent>
        </motion.div>
      </div>
    )}
  </div>

  );
};
const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="text-sm">
    <span className="font-medium text-muted-foreground">{label}:</span>
    <p className="text-foreground mt-1">{value}</p>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-foreground border-b border-muted-foreground/20 pb-2">
      {title}
    </h3>
    {children}
  </div>
);


export default Dashboard;