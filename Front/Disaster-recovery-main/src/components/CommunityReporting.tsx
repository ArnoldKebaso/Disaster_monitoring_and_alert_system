import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Camera, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Select } from "./ui/select";

const hazardTypes = [
  { value: 'Flooding', label: '🌊 Flooding', description: 'Rising water levels, submerged areas' },
  { value: 'Wildfire', label: '🔥 Wildfire', description: 'Smoke, flames, or burning smell' },
  { value: 'Landslide', label: '🏔️ Landslide', description: 'Moving earth, rocks, or debris' },
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
  const [reportType, setReportType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  // useEffect(() => {
  //   // Fetch reports from the backend
  //   axios.get('http://localhost:3000/community-reports')
  //     .then(response => {
  //       setReports(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching reports:', error);
  //     });
  // }, []);

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('reportType', reportType);
  //   formData.append('location', location);
  //   formData.append('description', description);
  //   if (image) {
  //     formData.append('image', image);
  //   }

  //   try {
  //     await axios.post('http://localhost:3000/community-reports', formData);
  //     alert('Report submitted successfully!');
  //     // Clear form fields after submission
  //     setReportType('');
  //     setLocation('');
  //     setDescription('');
  //     setImage(null);
  //     // Refresh the report list
  //     const response = await axios.get('http://localhost:3000/community-reports');
  //     setReports(response.data);
  //   } catch (error) {
  //     console.error('Error submitting report:', error);
  //     alert('Failed to submit the report.');
  //   }
  // };

// const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
  
//   // Prepare form data
//   const formData = new FormData();
//   formData.append('report_type', reportType);
//   formData.append('location', location);
//   formData.append('description', description);
//   if (image) {
//     formData.append('image', image);
//   }

//   try {
//     // Log the data being sent for debugging
//     console.log("Submitting data:", Object.fromEntries(formData.entries()));

//     // Send the POST request
//     const response = await axios.post('http://localhost:3000/community-reports', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     // Display success message and reset form
//     alert('Report submitted successfully!');
//     setReportType('');
//     setLocation('');
//     setDescription('');
//     setImage(null);

//     // Refresh the report list
//     const updatedReports = await axios.get('http://localhost:3000/community-reports');
//     setReports(updatedReports.data);

//   } catch (error) {
//     // Type guard for handling Axios error
//     if (axios.isAxiosError(error)) {
//       console.error('Error submitting report:', error.response?.data || error.message);
//     } else {
//       console.error('Unknown error:', error);
//     }

//     alert('Failed to submit the report. Please check your inputs and try again.');
//   }
// };

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Prepare JSON data instead of FormData
  const data = {
    report_type: reportType,
    location: location,
    description: description,
    image_url: image ? URL.createObjectURL(image) : null,  // Convert image to URL if necessary
    status: "pending"  // Set a default status if required
  };

  try {
    const response = await axios.post('http://localhost:3000/community-reports', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    alert('Report submitted successfully!');
    setReportType('');
    setLocation('');
    setDescription('');
    setImage(null);

    const updatedReports = await axios.get('http://localhost:3000/community-reports');
    setReports(updatedReports.data);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error submitting report:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }

    alert('Failed to submit the report. Please check your inputs and try again.');
  }
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
              {reports.map((report) => (
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
