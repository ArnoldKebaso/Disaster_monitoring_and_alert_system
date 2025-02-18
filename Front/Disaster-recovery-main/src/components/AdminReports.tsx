import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface Report {
  report_id: number;
  report_type: string;
  location: string;
  description: string;
  status: string;
  createdAt: string;
  User: {
    username: string;
  } | null;
}

interface AnalyticsData {
  location?: string;
  report_type?: string;
  count: number;
}

const AdminReportsDashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [frequentTypes, setFrequentTypes] = useState<AnalyticsData[]>([]);
  const [frequentLocations, setFrequentLocations] = useState<AnalyticsData[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [typesRes, locationsRes] = await Promise.all([
          axios.get('http://localhost:3000/community-reports/analytics/frequent-types'),
          axios.get('http://localhost:3000/community-reports/analytics/frequent-locations')
        ]);

        setFrequentTypes(typesRes.data);
        setFrequentLocations(locationsRes.data);
        
        // Combine backend locations with existing options
        const allLocations = Array.from(
          new Set([
          ...locationsRes.data.map((loc: AnalyticsData) => loc.location || ''),
          ...locationOptions.map(opt => opt.value)
  ])
);
        setLocations(allLocations.filter(l => l));
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('API Error:', err);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Handle month filter
  useEffect(() => {
    const fetchMonthlyReports = async () => {
      if (!selectedMonth) return;

      try {
        const [year, month] = selectedMonth.split('-');
        const response = await axios.get(
          `http://localhost:3000/community-reports/filter/month?year=${year}&month=${month}`
        );
        setFilteredReports(response.data);
      } catch (err) {
        setError('Failed to load monthly reports');
        console.error('Monthly filter error:', err);
      }
    };

    fetchMonthlyReports();
  }, [selectedMonth]);

  // Handle location filter
  useEffect(() => {
    const fetchLocationReports = async () => {
      if (!selectedLocation) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/community-reports/filter/location?location=${encodeURIComponent(selectedLocation)}`
        );
        setFilteredReports(response.data);
      } catch (err) {
        setError('Failed to load location reports');
        console.error('Location filter error:', err);
      }
    };

    fetchLocationReports();
  }, [selectedLocation]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Location options from your original component
  const locationOptions = [
    { value: "Bumadeya", label: "Bumadeya" },
    { value: "Budalangi Central", label: "Budalangi Central" },
    // ... include all your location options here
  ];


  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex gap-4">
        <div className="w-64">
       
          <label className="block text-sm font-medium mb-2">Filter by Month</label>
          <input
            type="month"
            className="w-full p-2 border rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
        
        <div className="w-64">
          <label className="block text-sm font-medium mb-2">Filter by Location</label>
          <Select
            value={selectedLocation}
            onChange={(value) => setSelectedLocation(value)} // Now receives direct string value
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
          ))}
      </Select>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Most Frequent Report Types</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={frequentTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="report_type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Frequent Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={frequentLocations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card>
      </div>

      {/* Filtered Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Filtered Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map(report => (
                <TableRow key={report.report_id}>
                  <TableCell>{report.report_type}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{formatDate(report.createdAt)}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.User?.username || 'Anonymous'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReportsDashboard;