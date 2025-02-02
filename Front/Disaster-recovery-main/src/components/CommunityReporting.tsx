import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import Select from 'react-select'; // Ensure you import the correct Select component

const hazardTypes = [
  { value: 'FlashFlood', label: '⚡ Flash Flood', description: 'Sudden, intense flooding.' },
  { value: 'RiverFlood', label: '🌊 River Flood', description: 'Overflowing rivers and streams.' },
  { value: 'CoastalFlood', label: '🌴 Coastal Flood', description: 'Flooding along coastlines.' },
  { value: 'UrbanFlood', label: '🏙️ Urban Flood', description: 'Flooding in cities and towns.' },
  { value: 'ElNinoFlooding', label: '🌧️ El Niño Flooding', description: 'Flooding due to El Niño effects.' },
];

const locationOptions = [
  { value: "Bumadeya", label: "Bumadeya" },
  { value: "Budalangi Central", label: "Budalangi Central" },
  { value: "Budubusi", label: "Budubusi" },
  { value: "Mundere", label: "Mundere" },
  { value: "Musoma", label: "Musoma" },
  { value: "Sibuka", label: "Sibuka" },
  { value: "Sio Port", label: "Sio Port" },
  { value: "Rukala", label: "Rukala" },
  { value: "Mukhweya", label: "Mukhweya" },
  { value: "Sigulu Island", label: "Sigulu Island" },
  { value: "Siyaya", label: "Siyaya" },
  { value: "Nambuku", label: "Nambuku" },
  { value: "West Bunyala", label: "West Bunyala" },
  { value: "East Bunyala", label: "East Bunyala" },
  { value: "South Bunyala", label: "South Bunyala" },
];

interface Report {
  id: number;
  type: string;
  location: string;
  timestamp: string;
  status: string;
  user: string;
}

const CommunityReporting: React.FC = () => {
  const [reportType, setReportType] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<{ value: string; label: string }[]>([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/community-reports')
      .then((response) => setReports(response.data))
      .catch((error) => console.error('Error fetching reports:', error));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reportType || selectedLocations.length === 0 || !description) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      report_type: reportType,
      locations: selectedLocations.map((loc) => loc.value),
      description,
      image_url: image ? URL.createObjectURL(image) : null,
      status: "pending",
    };

    try {
      await axios.post('http://localhost:3000/community-reports', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert("Report submitted successfully!");
      setReportType("");
      setSelectedLocations([]);
      setDescription("");
      setImage(null);

      const response = await axios.get('http://localhost:3000/community-reports');
      setReports(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert(`Failed to submit the report. Error: ${error.message}`);
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Community Reporting</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Submit a Report Form */}
          <Card>
            <CardContent className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Submit a Report</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="hazard-type" className="block text-sm font-medium text-gray-700">
                    Type of Hazard
                  </label>
                  <Select
                    id="hazard-type"
                    value={hazardTypes.find((hazard) => hazard.value === reportType)}
                    onChange={(selectedOption) => setReportType(selectedOption?.value || "")}
                    options={hazardTypes}
                    placeholder="Select a hazard type"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <Select
                    isMulti
                    options={locationOptions}
                    value={selectedLocations}
                    onChange={(selectedOptions) => setSelectedLocations(selectedOptions as { value: string; label: string }[])}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select locations..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the hazard..."
                    rows={6}
                    className="w-full p-2 border"
                  />
                </div>

                <div>
                  <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-lg">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Community Reports */}
          <Card>
            <CardContent className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Community Reports</h2>
              <div className="space-y-4">
                {reports
                  .slice(-10) // Get the last 10 reports
                  .reverse() // Reverse to display the latest first
                  .map((report) => (
                    <Card key={report.id} className="border rounded-lg shadow-sm">
                      <CardContent className="p-4 flex items-start space-x-4">
                        <div className="flex-1">
                          <p className="font-semibold">{report.user}</p>
                          <p className="text-sm text-gray-500">{report.type}</p>
                          <div className="flex items-center mt-1">
                            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{report.location}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="mr-2 h-4 w-4 text-gray-400" />
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
    </div>
  );
};

export default CommunityReporting;