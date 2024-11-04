import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Camera, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Select } from "./ui/select";

const hazardTypes = [
  { value: 'flooding', label: '🌊 Flooding', description: 'Rising water levels, submerged areas' },
  { value: 'wildfire', label: '🔥 Wildfire', description: 'Smoke, flames, or burning smell' },
  { value: 'landslide', label: '🏔️ Landslide', description: 'Moving earth, rocks, or debris' },
  { value: 'earthquake', label: '🌋 Earthquake', description: 'Ground shaking or structural damage' },
  { value: 'storm-damage', label: '🌪️ Storm Damage', description: 'High winds, heavy rain, or hail' },
  { value: 'other', label: '❓ Other', description: 'Specify in description' },
  { value: 'unsure', label: '❗ I\'m not sure', description: 'Provide details in description' },
];

const mockReports = [
  { id: 1, type: 'Flooding', location: 'Downtown River Area', timestamp: '2023-06-15T10:30:00Z', status: 'Verified', user: 'John D.' },
  { id: 2, type: 'Wildfire', location: 'Northern Hills', timestamp: '2023-06-15T09:45:00Z', status: 'Pending', user: 'Sarah M.' },
  { id: 3, type: 'Landslide', location: 'Mountain Pass Road', timestamp: '2023-06-15T08:15:00Z', status: 'Verified', user: 'Mike R.' },
];

const CommunityReporting: React.FC = () => {
  const [reportType, setReportType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitting report:', { reportType, location, description, image });
    // Reset form fields
    setReportType('');
    setLocation('');
    setDescription('');
    setImage(null);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Community Reporting</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Submit a Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="hazard-type" className="block text-sm font-medium text-gray-700">Type of Hazard</label>
                <Select
                  id="hazard-type"
                  value={reportType}
                  onValueChange={setReportType}
                  placeholder="Select a hazard type"
                >
                  {hazardTypes.map((hazard) => (
                    <Select.Option key={hazard.value} value={hazard.value}>
                      <span className="font-medium">{hazard.label}</span>
                      <span className="text-muted-foreground"> - {hazard.description}</span>
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                  placeholder="Enter the location"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  placeholder="Describe the hazard or early warning signs"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">Upload Image</label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">Submit Report</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Community Reports</h2>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-4 flex items-start space-x-4">
                    <div className="flex-1">
                      <p className="font-semibold">{report.user}</p>
                      <p className="text-sm text-gray-500">{report.type}</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm text-gray-500">{report.location}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm text-gray-500">{formatDate(report.timestamp)}</span>
                      </div>
                    </div>
                    {report.status === 'Verified' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {report.status === 'Pending' && (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityReporting;