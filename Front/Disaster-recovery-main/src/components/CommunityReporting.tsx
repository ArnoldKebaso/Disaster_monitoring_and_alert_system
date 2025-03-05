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

  useEffect(() => {
    axios
      .get('http://localhost:3000/community-reports')
      .then((response) => setReports(response.data))
      .catch((error) => toast.error("Error loading reports", {
        description: error.message
      }));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    if (!reportType || !selectedLocation || !description) {
      toast.warning("Missing Information", {
        description: "Please fill in all required fields"
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      report_type: reportType,
      location: selectedLocation.value,
      description,
      image_url: image ? URL.createObjectURL(image) : null,
      status: "pending",
    };

    try {
      await axios.post('http://localhost:3000/community-reports', payload);
      
      toast.success("Report Submitted", {
        description: "Your flood report has been received",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismissed"),
        },
      });

      setReportType("");
      setSelectedLocation(null);
      setDescription("");
      setImage(null);
      setImagePreview(null);

      const response = await axios.get('http://localhost:3000/community-reports');
      setReports(response.data);
    } catch (error) {
      toast.error("Submission Failed", {
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  return (
    <div className="p-6 bg-muted/40 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Community Flood Reporting
          </h1>
          <p className="text-muted-foreground">
            Report and track flood incidents in real-time
          </p>
        </motion.div>

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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  New Flood Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Flood Type
                    </label>
                    <Select
                      value={hazardTypes.find((hazard) => hazard.value === reportType)}
                      onChange={(selectedOption) => setReportType(selectedOption?.value || "")}
                      options={hazardTypes}
                      formatOptionLabel={(option) => (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{option.label.split(' ')[0]}</span>
                          <span className="text-muted-foreground">{option.description}</span>
                        </div>
                      )}
                      getOptionValue={(option) => option.value}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: '8px',
                          padding: '6px',
                          borderColor: '#e2e8f0',
                          '&:hover': { borderColor: '#cbd5e1' }
                        }),
                        option: (base, { isFocused }) => ({
                          ...base,
                          backgroundColor: isFocused ? '#f0f9ff' : 'white',
                          color: '#0f172a',
                          padding: '8px 12px'
                        })
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Location
                    </label>
                    <div className="flex items-center gap-2">
                      <Select
                        options={locationOptions}
                        value={selectedLocation}
                        onChange={(selectedOption) => setSelectedLocation(selectedOption)}
                        className="flex-1"
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
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              setUserLocation({
                                lat: position.coords.latitude,
                                lon: position.coords.longitude
                              });
                              toast.info("Location Detected", {
                                description: "Your location has been captured"
                              });
                            },
                            (error) => toast.error("Location Error", {
                              description: error.message
                            })
                          );
                        }}
                      >
                        <LocateFixed className="w-4 h-4 mr-2" />
                        Detect
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Description
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the flood situation..."
                      rows={4}
                      className="resize-none border-muted-foreground/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Upload Evidence
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/20 rounded-lg cursor-pointer hover:border-blue-500 transition-colors relative overflow-hidden">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      ) : (
                        <>
                          <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload image
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

          {/* Recent Reports */}
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
                    <Button
                      variant={statusFilter === 'All' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setStatusFilter('All')}
                    >
                      All
                    </Button>
                    <Button
                      variant={statusFilter === 'Verified' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setStatusFilter('Verified')}
                    >
                      Verified
                    </Button>
                    <Button
                      variant={statusFilter === 'Pending' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setStatusFilter('Pending')}
                    >
                      Pending
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-y-auto h-[calc(100vh-260px)] space-y-4 p-4">
                  {reports
                    .filter(r => statusFilter === 'All' ? true : r.status === statusFilter)
                    .slice(-10)
                    .reverse()
                    .map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-muted-foreground/10 hover:border-blue-500/30 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className={cn(
                                    "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 w-fit",
                                    report.status === 'Verified' 
                                      ? 'bg-green-100/80 text-green-800 dark:bg-green-900/20' 
                                      : 'bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/20'
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