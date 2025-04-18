import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from './ui/select';

/**
 * Interface defining the structure of a Community Report
 */
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

/**
 * Interface for analytics data showing counts by location or report type
 */
interface AnalyticsData {
  location?: string;
  report_type?: string;
  count: number;
}

/**
 * AdminReportsDashboard Component - Provides analytics and filtering for community reports
 * 
 * Features:
 * - Visual analytics charts for report types and locations
 * - Month and location filtering
 * - PDF report generation
 * - Tabular view of filtered reports
 */
const AdminReportsDashboard: React.FC = () => {
  // State management
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [frequentTypes, setFrequentTypes] = useState<AnalyticsData[]>([]);
  const [frequentLocations, setFrequentLocations] = useState<AnalyticsData[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Ref for PDF generation
  const pdfRef = useRef<HTMLDivElement>(null);

  /**
   * Generate and download a PDF report of the current dashboard view
   */
  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    if (!element) return;

    try {
      // Convert dashboard to canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      } as any);
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add image to PDF and download
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`community-report-${new Date().toISOString()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // ===================== DATA FETCHING EFFECTS =====================

  /**
   * Fetch initial analytics data on component mount
   */
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Fetch both report types and locations in parallel
        const [typesRes, locationsRes] = await Promise.all([
          axios.get('http://localhost:3000/community-reports/analytics/frequent-types'),
          axios.get('http://localhost:3000/community-reports/analytics/frequent-locations')
        ]);

        setFrequentTypes(typesRes.data);
        setFrequentLocations(locationsRes.data);
        
        // Combine backend locations with predefined options
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

  /**
   * Fetch reports when month filter changes
   */
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

  /**
   * Fetch reports when location filter changes
   */
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

  // ===================== UTILITY FUNCTIONS =====================

  /**
   * Clear all active filters
   */
  const handleClearFilters = () => {
    setSelectedMonth('');
    setSelectedLocation('');
    setFilteredReports([]);
  };

  /**
   * Format timestamp to readable date string
   * @param {string} timestamp - The timestamp to format
   * @returns {string} Formatted date string
   */
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

  // Predefined location options
  const locationOptions = [
    { value: "Bumadeya", label: "Bumadeya" },
    { value: "Budalangi Central", label: "Budalangi Central" },
    // ... other location options
  ];

  // ===================== RENDER =====================

  return (
    <div className="p-6 space-y-6">
      {/* Filters Section */}
      <div className="flex gap-4 flex-wrap">
        {/* Month Filter */}
        <div className="w-64">
          <label className="block text-sm font-medium mb-2">Filter by Month</label>
          <input
            type="month"
            className="w-full p-2 border rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
        
        {/* Location Filter */}
        <div className="w-64">
          <label className="block text-sm font-medium mb-2">Filter by Location</label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="your-custom-class">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filter Button */}
        <div className="w-64 flex items-end">
          <button 
            onClick={handleClearFilters}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Filters
          </button>
        </div>

        {/* PDF Download Button */}
        <div className="w-64 flex items-end">
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF Report
          </button>
        </div>
      </div>
      
      {/* Dashboard Content (PDF target) */}
      <div ref={pdfRef} className="p-6 space-y-6">
        {/* Analytics Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Report Types Chart */}
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

          {/* Locations Chart */}
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
            <CardTitle>Filtered Reports ({filteredReports.length})</CardTitle>
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
                    <TableCell className={selectedLocation === report.location ? "bg-blue-200 text-blue-900" : ""}>
                      {report.location}
                    </TableCell>
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
    </div>
  );
};

export default AdminReportsDashboard;