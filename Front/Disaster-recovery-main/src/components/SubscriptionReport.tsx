import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import SubscriptionPDFTemplate from './SubscriptionPDFTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';




interface Subscription {
  id: number;
  method: 'email' | 'sms';
  contact: string;
  locations: string[];
  createdAt: string;
}

interface AnalyticsData {
  label: string;
  count: number;
}

const SubscriptionReport: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [methodDistribution, setMethodDistribution] = useState<AnalyticsData[]>([]);
  const [locationDistribution, setLocationDistribution] = useState<AnalyticsData[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const pdfRef = useRef<HTMLDivElement>(null);

const handleDownloadPDF = async () => {
  const element = pdfRef.current;
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    }as any);
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`subscription-report-${new Date().toISOString()}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};



  // Fetch initial analytics data
useEffect(() => {
  const fetchAnalyticsData = async () => {
    try {
      const [methodsRes, locationsRes] = await Promise.all([
        axios.get('http://localhost:3000/subscriptions/analytics/method-counts'),
        axios.get('http://localhost:3000/subscriptions/analytics/location-counts')
      ]);

      // Validate and transform method data
      const validMethods = methodsRes.data
        .filter((item: any) => 
          typeof item.label === 'string' && 
          ['email', 'sms'].includes(item.label.toLowerCase())
        )
        .map((item: any) => ({
          label: item.label.trim(),
          count: Number(item.count) || 0
        }));

      // Validate and transform location data
      const validLocations = locationsRes.data
        .filter((item: any) => 
          typeof item.label === 'string' &&
          item.label.trim() !== ''
        )
        .map((item: any) => ({
          label: item.label.trim(),
          count: Number(item.count) || 0
        }));

      setMethodDistribution(validMethods);
      setLocationDistribution(validLocations);
      
      // Extract and validate unique locations
      const allLocations = validLocations
        .map(item => item.label)
        .filter(l => l.trim() !== '');
        
      setLocations(Array.from(new Set(allLocations)));
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('API Error:', err);
    }
  };

  fetchAnalyticsData();
}, []);

  // Handle month filter
  useEffect(() => {
    const fetchMonthlySubscriptions = async () => {
      if (!selectedMonth) return;

      try {
        const [year, month] = selectedMonth.split('-');
        const response = await axios.get(
          `http://localhost:3000/subscriptions/filter/month?year=${year}&month=${month}`
        );
        setFilteredSubscriptions(response.data);
      } catch (err) {
        setError('Failed to load monthly subscriptions');
        console.error('Monthly filter error:', err);
      }
    };

    fetchMonthlySubscriptions();
  }, [selectedMonth]);

  // Handle location filter
  useEffect(() => {
    const fetchLocationSubscriptions = async () => {
      if (!selectedLocation) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/subscriptions/filter/location?location=${encodeURIComponent(selectedLocation)}`
        );
        setFilteredSubscriptions(response.data);
      } catch (err) {
        setError('Failed to load location subscriptions');
        console.error('Location filter error:', err);
      }
    };

    fetchLocationSubscriptions();
  }, [selectedLocation]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
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
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Locations
              </SelectItem>
              {locations.map(location => (
                <SelectItem 
                  key={location} 
                  value={location}
                  // Add validation check
                  disabled={!location || typeof location !== 'string'}
                >
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
              

              <div className="w-64">
                    <button 
                      onClick={handleDownloadPDF}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Download PDF Report
                    </button>
                  </div>


                  {/* <div className="w-64">
                        <PDFDownloadLink
                          document={
                            <SubscriptionPDFTemplate
                              data={filteredSubscriptions}
                              methodDistribution={methodDistribution}
                              locationDistribution={locationDistribution}
                              selectedMonth={selectedMonth}
                              selectedLocation={selectedLocation}
                            />
                          }
                          fileName={`subscription-report-${Date.now()}.pdf`}
                        >
                          {({ loading }) => (
                            <button 
                              className={`w-full bg-blue-600 text-white px-4 py-2 rounded ${
                                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                              }`}
                              disabled={loading}
                            >
                              {loading ? 'Generating PDF...' : 'Download PDF Report'}
                            </button>
                          )}
                        </PDFDownloadLink>
                  </div>
         */}
      </div>
        <div ref={pdfRef} className="p-6 space-y-6">
      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {subscription.locations.map(location => (
                        <span 
                          key={location}
                          className="px-2 py-1 bg-gray-100 rounded text-sm"
                        >
                          {location}
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