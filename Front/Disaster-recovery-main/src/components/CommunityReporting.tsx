import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { MapPin, Clock, CheckCircle, AlertTriangle, UploadCloud, Loader2, LocateFixed } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

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
  createdAt: string;
  status: string;
  user: string;
  description: string;
}

const CommunityReporting: React.FC = () => {
  const [reportType, setReportType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{ value: string; label: string } | null>(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [locationSource, setLocationSource] = useState<'manual' | 'detected' | null>(null);







  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/community-reports');
        setReports(response.data);
      } catch (error) {
        toast.error("Error loading reports", {
          description: axios.isAxiosError(error) ? error.message : "Failed to fetch reports"
        });
      }
    };
    fetchReports();
  }, []);

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsSubmitting(true);

  // Validate all required fields, including image
  if (!reportType || !selectedLocation || !description.trim() || !image) {
    toast.warning("Missing Information", {
      description: "Please fill in all required fields, including an evidence image."
    });
    setIsSubmitting(false);
    return;
  }

  // Use FormData to handle file upload
  const formData = new FormData();

  formData.append('report_type', reportType);
  formData.append('location', selectedLocation.value);
  formData.append('description', description);
  formData.append('status', "pending");
  formData.append('image', image);

  try {
    // await axios.post('http://localhost:3000/community-reports', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });

    await axios.post('http://localhost:3000/community-reports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true // Add this
    });
    
    toast.success("Report Submitted", {
      description: "Your flood report has been received",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismissed"),
      },
    });

    // Reset form fields
    setReportType("");
    setSelectedLocation(null);
    setDescription("");
    setImage(null);
    setImagePreview(null);

    // Refresh the reports list
    const response = await axios.get('http://localhost:3000/community-reports', {
      withCredentials: true // Add this
    });

    setReports(response.data);
  } catch (error: any) {
    toast.error("Submission Failed", {
      description: axios.isAxiosError(error) ? error.message : "An error occurred"
    });
  } finally {
    setIsSubmitting(false);
  }
};


const handleLocateUser = () => {
  if (!navigator.geolocation) {
    toast.error('Geolocation Error', {
      description: 'Your browser does not support geolocation',
    });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        
        // Improved location parsing with fallback
        const address = data.address || {};
        const detected = address.village || address.town || address.city || 
                        address.suburb || address.county || data.display_name;

        // Find matching option structure
        const locationValue = detected.replace(/\s+/g, '-').toLowerCase();
        
        // Update both the select component and form state
        setSelectedLocation({
          value: locationValue,
          label: detected
        });
        setLocationSource("detected");

        toast.success(`Location detected: ${detected}`);
      } catch (error) {
        console.error('Reverse geocoding error:', error);
        toast.error('Location Error', { 
          description: 'Failed to retrieve location details.' 
        });
      }
    },
    (error) => {
      console.error('Geolocation error:', error);
      let errorMessage = 'Unable to retrieve your location';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access was denied. Please enable permissions in your browser settings.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'The request to get location timed out.';
          break;
      }
      toast.error('Location Error', { description: errorMessage });
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};



  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImage(null);
      setImagePreview(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Invalid File Type", {
        description: "Please upload an image file (JPEG, PNG, GIF)"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File Too Large", {
        description: "Maximum file size is 5MB"
      });
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  return (
    <div className="p-6 bg-muted/40 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Community Flood Reporting
          </h1>
          <p className="text-muted-foreground">
            Report and track flood incidents in real-time
          </p>
        </motion.div>

        {/* Active Alert Banner */}
        {reports.some(r => r.status === 'Critical') && (
          <div className="bg-red-100/90 border border-red-200 p-4 rounded-lg flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-medium text-red-800">Active Flood Alert</h3>
              <p className="text-sm text-red-700">
                Emergency response ongoing in reported areas
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Report Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  New Flood Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Flood Type Select */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Flood Type *
                    </label>
                    <Select
                      value={hazardTypes.find(h => h.value === reportType)}
                      onChange={(option) => setReportType(option?.value || "")}
                      options={hazardTypes}
                      formatOptionLabel={(option) => (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{option.label.split(' ')[0]}</span>
                          <span className="text-muted-foreground">{option.description}</span>
                        </div>
                      )}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: '8px',
                          padding: '6px',
                          borderColor: '#e2e8f0',
                          '&:hover': { borderColor: '#cbd5e1' }
                        })
                      }}
                    />
                  </div>

                  {/* Location Select */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Location *
                    </label>
                    <div className="flex items-center gap-2">
                    

                      <Select
                          options={locationOptions}
                          value={selectedLocation}
                          onChange={(newValue) => {
                            setSelectedLocation(newValue);
                            setLocationSource('manual');
                          }}
                          isDisabled={locationSource === 'detected'}
                          className="w-full"
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderRadius: '8px',
                              padding: '6px',
                              borderColor: '#e2e8f0',
                              '&:hover': { borderColor: '#cbd5e1' },
                              opacity: locationSource === 'detected' ? 0.7 : 1
                            })
                          }}
                        />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleLocateUser}
                        disabled={locationSource === 'manual'}
                      >
                        <LocateFixed className="w-4 h-4 mr-2" />
                        Detect
                      </Button>
                                          
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Description *
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the flood situation..."
                      rows={4}
                      className="resize-none border-muted-foreground/20 focus:border-blue-500"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Upload Evidence *
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/20 rounded-lg cursor-pointer hover:border-blue-500 transition-colors relative overflow-hidden">
                      {imagePreview ? (
                        <>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover absolute inset-0"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                            Click to change image
                          </div>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload image (max 5MB)
                          </span>
                        </>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 font-semibold relative"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Report"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Reports List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-[calc(100vh-180px)] overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Recent Reports
                  </CardTitle>
                  <div className="flex gap-1">
                    {['All', 'Verified', 'Pending'].map((filter) => (
                      <Button
                        key={filter}
                        variant={statusFilter === filter ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setStatusFilter(filter)}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-y-auto h-[calc(100vh-260px)] space-y-4 p-4">
                  {reports
                    .filter(r => statusFilter === 'All' ? true : r.status === statusFilter)
                    .slice(-10)
                    .reverse()
                    .map((report) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        // transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-muted-foreground/10 hover:border-blue-500/30 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className={cn(
                                    "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 w-fit",
                                    report.status === 'Verified' 
                                      ? 'bg-green-100/80 text-green-800' 
                                      : 'bg-yellow-100/80 text-yellow-800'
                                  )}>
                                    {report.status === 'Verified' ? (
                                      <CheckCircle className="w-3.5 h-3.5" />
                                    ) : (
                                      <Clock className="w-3.5 h-3.5" />
                                    )}
                                    {report.status}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {report.user}
                                  </span>
                                </div>
                                <h4 className="font-medium">{report.type}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4" />
                                  <span>{report.location}</span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {report.description}
                                </p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(report.createdAt)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  {reports.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                      <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium">No flood reports yet</h3>
                      <p className="text-sm text-muted-foreground">
                        Be the first to report a flood incident
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommunityReporting;