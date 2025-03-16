// UserCommunityReports.tsx
import React, { useState, useEffect } from 'react';
import { X, Search, MapPin, Clock, AlertCircle, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ReactPaginate from 'react-paginate';

interface CommunityReport {
  report_id: number;
  report_type: string;
  location: string;
  description: string;
  image_url: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 6;

const UserCommunityReports: React.FC = () => {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedReport, setSelectedReport] = useState<CommunityReport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:3000/community-reports', {
        credentials: 'include',
      });
      const data = await response.json();
      const sorted = data.sort((a: CommunityReport, b: CommunityReport) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setReports(sorted);
    } catch (error) {
      toast.error('Failed to load community reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, []);

  const filteredReports = reports.filter(report =>
    report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
  const currentReports = filteredReports.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Community Flood Reports</h1>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentReports.map(report => (
            <motion.div
              key={report.report_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="text-lg font-semibold">{report.report_type}</h3>
                        <span className={`${getStatusColor(report.status)} px-2 py-1 rounded-full text-xs`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      Details
                    </Button>
                  </div>

                  {report.image_url && (
                    <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={report.image_url}
                        alt="Flood Report"
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setSelectedReport(report)}
                      />
                    </div>
                  )}

                  <p className="text-gray-600 line-clamp-3 mb-4">{report.description}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{report.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName="flex justify-center gap-2"
            pageClassName="px-3 py-1 rounded hover:bg-gray-100"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 rounded hover:bg-gray-100"
            nextClassName="px-3 py-1 rounded hover:bg-gray-100"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>

        {/* Details Modal */}
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Report Details</h2>
                  <Button
                    onClick={() => setSelectedReport(null)}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <DetailItem label="Report Type" value={selectedReport.report_type} />
                    <DetailItem label="Location" value={selectedReport.location} />
                    <DetailItem label="Status" value={selectedReport.status} />
                  </div>
                  <div className="space-y-4">
                    <DetailItem
                      label="Reported On"
                      value={new Date(selectedReport.createdAt).toLocaleString()}
                    />
                    <DetailItem
                      label="Last Updated"
                      value={new Date(selectedReport.updatedAt).toLocaleString()}
                    />
                  </div>
                </div>

                <Section title="Description">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedReport.description}</p>
                </Section>

                {selectedReport.image_url && (
                  <Section title="Visual Evidence">
                    <div className="relative w-full h-96 rounded-xl overflow-hidden border border-gray-200">
                      <img
                        src={selectedReport.image_url}
                        alt="Flood Evidence"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Section>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {currentReports.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No flood reports found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="text-sm">
    <span className="font-medium text-gray-600">{label}:</span>
    <p className="text-gray-800 mt-1 font-medium">{value}</p>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

export default UserCommunityReports;