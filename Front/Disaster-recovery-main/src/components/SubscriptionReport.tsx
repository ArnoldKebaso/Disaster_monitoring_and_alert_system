// Import necessary libraries and components
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Define the structure of a subscription
interface Subscription {
  id: number;
  method: 'email' | 'sms'; // Subscription method
  contact: string; // Contact information (email or phone number)
  locations: string[]; // Associated locations
  createdAt: string; // Creation timestamp
}

// Define the structure of analytics data
interface AnalyticsData {
  label: string; // Label for the data (e.g., "email", "sms")
  count: number; // Count of subscriptions
}

const SubscriptionReport: React.FC = () => {
  // State variables for filters, subscriptions, and analytics data
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // Selected month filter
  const [selectedLocation, setSelectedLocation] = useState<string>(''); // Selected location filter
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]); // Filtered subscriptions
  const [methodDistribution, setMethodDistribution] = useState<AnalyticsData[]>([]); // Method distribution data
  const [locationDistribution, setLocationDistribution] = useState<AnalyticsData[]>([]); // Location distribution data
  const [locations, setLocations] = useState<string[]>([]); // List of available locations
  const [error, setError] = useState<string | null>(null); // Error message
  const pdfRef = useRef<HTMLDivElement>(null); // Reference for the PDF export

  // Function to download the report as a PDF
  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Increase resolution
        useCORS: true, // Enable cross-origin resource sharing
      } as any);
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to image
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document
      const imgWidth = 190; // Image width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); // Add image to PDF
      pdf.save(`subscription-report-${new Date().toISOString()}.pdf`); // Save the PDF
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Fetch analytics data for methods and locations
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [methodsRes, locationsRes] = await Promise.all([
          axios.get('http://localhost:3000/subscriptions/analytics/method-counts'),
          axios.get('http://localhost:3000/subscriptions/analytics/location-counts')
        ]);

        // Validate and format method distribution data
        const validMethods = methodsRes.data
          .filter((item: any) => 
            typeof item.label === 'string' && 
            ['email', 'sms'].includes(item.label.toLowerCase())
          )
          .map((item: any) => ({
            label: item.label.trim(),
            count: Number(item.count) || 0
          }));

        // Validate and format location distribution data
        const validLocations = locationsRes.data
          .filter((item: any) => typeof item.label === 'string' && item.label.trim() !== '')
          .map((item: any) => ({
            label: item.label.trim(),
            count: Number(item.count) || 0
          }));

        setMethodDistribution(validMethods); // Update method distribution state
        setLocationDistribution(validLocations); // Update location distribution state
        
        // Extract unique locations
        const allLocations = validLocations.map(item => item.label).filter(l => l.trim() !== '');
        setLocations(Array.from(new Set(allLocations))); // Remove duplicates
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('API Error:', err);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Fetch subscriptions for the selected month
  useEffect(() => {
    const fetchMonthlySubscriptions = async () => {
      if (!selectedMonth) return;
      try {
        const [year, month] = selectedMonth.split('-'); // Split year and month
        const response = await axios.get(
          `http://localhost:3000/subscriptions/filter/month?year=${year}&month=${month}`
        );
        setFilteredSubscriptions(response.data); // Update filtered subscriptions
      } catch (err) {
        setError('Failed to load monthly subscriptions');
        console.error('Monthly filter error:', err);
      }
    };

    fetchMonthlySubscriptions();
  }, [selectedMonth]);

  // Fetch subscriptions for the selected location
  useEffect(() => {
    const fetchLocationSubscriptions = async () => {
      if (!selectedLocation) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/subscriptions/by-location?location=${encodeURIComponent(selectedLocation)}`
        );
        setFilteredSubscriptions(response.data); // Update filtered subscriptions
      } catch (err) {
        setError('Failed to load location subscriptions');
        console.error('Location filter error:', err);
      }
    };

    fetchLocationSubscriptions();
  }, [selectedLocation]);

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedMonth(''); // Clear month filter
    setSelectedLocation(''); // Clear location filter
    setFilteredSubscriptions([]); // Clear filtered subscriptions
  };

  // Format a timestamp into a readable date
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

        {/* Clear Filters Button */}
        <div className="w-64 flex items-end">
          <button 
            onClick={handleClearFilters}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Filters
          </button>
        </div>

        {/* Download PDF Button */}
        <div className="w-64 flex items-end">
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF Report
          </button>
        </div>
      </div>

      <div ref={pdfRef} className="p-6 space-y-6">
        {/* Analytics Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Method Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Methods Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={500} height={300} data={methodDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>

          {/* Location Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Locations Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={500} height={300} data={locationDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </CardContent>
          </Card>
        </div>

        {/* Filtered Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Filtered Subscriptions ({filteredSubscriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Locations</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map(subscription => (
                  <TableRow key={subscription.id}>
                    <TableCell className="capitalize">{subscription.method}</TableCell>
                    <TableCell>{subscription.contact}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {subscription.locations.map(loc => (
                          <span 
                            key={loc}
                            className={`px-2 py-1 rounded text-sm ${
                              selectedLocation === loc
                                ? 'bg-blue-200 text-blue-900'
                                : 'bg-gray-100'
                            }`}
                          >
                            {loc}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(subscription.createdAt)}</TableCell>
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

export default SubscriptionReport;
