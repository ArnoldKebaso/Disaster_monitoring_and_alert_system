import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import Select from 'react-select'; // Ensure you import the correct Select component

// Hazard types with labels and descriptions
const alertTypes = [
  { value: 'FlashFlood', label: '⚡ Flash Flood', description: 'Sudden, intense flooding.' },
  { value: 'RiverFlood', label: '🌊 River Flood', description: 'Overflowing rivers and streams.' },
  { value: 'CoastalFlood', label: '🌴 Coastal Flood', description: 'Flooding along coastlines.' },
  { value: 'UrbanFlood', label: '🏙️ Urban Flood', description: 'Flooding in cities and towns.' },
  { value: 'ElNinoFlooding', label: '🌧️ El Niño Flooding', description: 'Flooding due to El Niño effects.' },
];

// Location dropdown options
const locationOptions = [
  { value: 'Bumadeya', label: 'Bumadeya' },
  { value: 'Budalangi Central', label: 'Budalangi Central' },
  { value: 'Budubusi', label: 'Budubusi' },
  { value: 'Mundere', label: 'Mundere' },
  { value: 'Musoma', label: 'Musoma' },
  { value: 'Sibuka', label: 'Sibuka' },
  { value: 'Sio Port', label: 'Sio Port' },
  { value: 'Rukala', label: 'Rukala' },
  { value: 'Mukhweya', label: 'Mukhweya' },
  { value: 'Sigulu Island', label: 'Sigulu Island' },
  { value: 'Siyaya', label: 'Siyaya' },
  { value: 'Nambuku', label: 'Nambuku' },
  { value: 'West Bunyala', label: 'West Bunyala' },
  { value: 'East Bunyala', label: 'East Bunyala' },
  { value: 'South Bunyala', label: 'South Bunyala' },
];

const severities = ['Low', 'Medium', 'High'];

const CreateAlert: React.FC = () => {
  const [alertType, setAlertType] = useState<{ value: string; label: string } | null>(null);
  const [severity, setSeverity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ value: string; label: string } | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!alertType || !severity || !selectedLocation) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      alert_type: alertType.value,
      severity,
      location: selectedLocation.value, // Store only one location
      description,
      status: 'active',
    };

    setLoading(true);

    try {
      await axios.post('http://localhost:3000/alerts', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Alert created successfully!');
      setAlertType(null);
      setSeverity('');
      setSelectedLocation(null);
      setDescription('');
    } catch (error) {
      console.error('Error creating alert:', error);
      alert('Failed to create the alert.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create a New Alert</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="alert-type" className="block text-sm font-medium text-gray-700">
              Alert Type
            </label>
            <Select
                  id="alert-type"
                  options={alertTypes}
                  value={alertType}
                  onChange={(selectedOption) => setAlertType(selectedOption)}
                  getOptionLabel={(option) => `${option.label} - ${(option as { value: string; label: string; description: string }).description}`} // Explicit type assertion
                  getOptionValue={(option) => option.value}
                  placeholder="Select an alert type"
                  className="basic-single-select"
                  classNamePrefix="select"
                />
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
              Severity
            </label>
            <Select
              id="severity"
              options={severities.map((level) => ({ value: level, label: level }))}
              value={severities.find((level) => level === severity) ? { value: severity, label: severity } : null}
              onChange={(selectedOption) => setSeverity(selectedOption?.value || '')}
              placeholder="Select severity level"
              className="basic-single-select"
              classNamePrefix="select"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <Select
              id="location"
              options={locationOptions}
              value={selectedLocation}
              onChange={(selectedOption) => setSelectedLocation(selectedOption)}
              placeholder="Select a location"
              className="basic-single-select"
              classNamePrefix="select"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide additional details about the alert"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className={`w-full py-3 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white`}
            disabled={loading}
          >
            {loading ? 'Creating Alert...' : 'Create Alert'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAlert;
