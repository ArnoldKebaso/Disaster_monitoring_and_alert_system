import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface Report {
  id: number;
  report_type: string;
  location: string;
  createdAt: string;
  status: string;
  user: { username: string };
}

interface AnalyticsData {
  report_type?: string;
  location?: string;
  count: number;
}

const AdminReportsDashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [frequentTypes, setFrequentTypes] = useState<AnalyticsData[]>([]);
  const [frequentLocations, setFrequentLocations] = useState<AnalyticsData[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    // Fetch initial analytics data
    axios.get('http://localhost:3000/community-reports/analytics/frequent-types')
      .then(res => setFrequentTypes(res.data));

    axios.get('http://localhost:3000/community-reports/analytics/frequent-locations')
      .then(res => {
        setFrequentLocations(res.data);
        setLocations(res.data.map((loc: AnalyticsData) => loc.location || ''));
      });
  }, []);

  useEffect(() => {
    // Handle month filter
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-');
      axios.get(`http://localhost:3000/community-reports/filter/month?year=${year}&month=${month}`)
        .then(res => setFilteredReports(res.data));
    }
  }, [selectedMonth]);

  useEffect(() => {
    // Handle location filter
    if (selectedLocation) {
      axios.get(`http://localhost:3000/community-reports/filter/location?location=${selectedLocation}`)
        .then(res => setFilteredReports(res.data));
    }
  }, [selectedLocation]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
                <TableRow key={report.id}>
                  <TableCell>{report.report_type}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{formatDate(report.createdAt)}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.user?.username || 'Anonymous'}</TableCell>
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