// AdminCommunityReports.tsx
import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { toast } from 'sonner';

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

const AdminCommunityReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

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
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update status');
      }
      const updatedReport = await response.json();
      setReports(reports.map(r => r.report_id === reportId ? updatedReport : r));
      toast.success('Status updated successfully');
    } catch (error: any) {
      console.error('Error updating status:', error);
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
      } else {
        throw new Error('Failed to delete report');
      }
    } catch (error: any) {
      console.error('Error deleting report:', error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading reports...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin: Manage Community Reports</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map(report => (
          <Card key={report.report_id} className="relative">
            <CardContent className="p-4">
              <div className="mb-2">
                <h2 className="text-xl font-semibold">{report.report_type}</h2>
                <p className="text-sm text-gray-600">Location: {report.location}</p>
              </div>
              <p className="text-sm mb-2">{report.description}</p>
              {report.image_url && (
                <img
                  src={report.image_url}
                  alt="Report Evidence"
                  className="w-full h-48 object-cover mb-2 rounded"
                />
              )}
              <div className="text-sm text-gray-500 mb-2">
                Submitted on: {new Date(report.createdAt).toLocaleString()}
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">
                    Status: <span className="capitalize">{report.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={report.status}
                      onValueChange={(value) => handleStatusChange(report.report_id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(report.report_id)} title="Delete">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Reported by: {report.User?.username || 'Unknown'} ({report.User?.email || 'N/A'})
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCommunityReports;
