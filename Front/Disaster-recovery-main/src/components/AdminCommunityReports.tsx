// AdminCommunityReports.tsx
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, User, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { toast } from 'sonner';
import ReactPaginate from 'react-paginate';

interface Report {
  report_id: number;
  report_type: string;
  location: string;
  description: string;
  image_url: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  User: {
    user_id: number;
    username: string;
    email: string;
    phone: string;
    location: string;
  } | null;
}

const statusOptions = ['pending', 'verified', 'rejected'];
const ITEMS_PER_PAGE = 6;

const AdminCommunityReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/community-reports', {
        credentials: 'include',
      });
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusChange = async (reportId: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/community-reports/${reportId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      const updatedReport = await response.json();
      setReports(reports.map(r => r.report_id === reportId ? updatedReport : r));
      toast.success('Status updated successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (reportId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/community-reports/${reportId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.status === 204) {
        setReports(reports.filter(r => r.report_id !== reportId));
        toast.success('Report deleted successfully');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Community Reports Management</h1>
        </div>

        {/* Filters Section */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentReports.map(report => (
            <Card key={report.report_id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold">{report.report_type}</h3>
                      <div className={`${getStatusColor(report.status)} px-2 py-1 rounded-full text-xs`}>
                        {report.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={report.status}
                      onValueChange={(value) => handleStatusChange(report.report_id, value)}
                    >
                      <SelectTrigger className="w-28 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(report.report_id)}
                      className="hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                {report.image_url && (
                  <img
                    src={report.image_url}
                    alt="Report"
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                )}

                <p className="text-gray-600 mb-4">{report.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>{report.User?.username || 'Anonymous'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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

        {currentReports.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No reports found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCommunityReports;