import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';

const alertTypes = [
  { value: 'FlashFlood', label: '⚡ Flash Flood' },
  { value: 'RiverFlood', label: '🌊 River Flood' },
  { value: 'CoastalFlood', label: '🌴 Coastal Flood' },
  { value: 'UrbanFlood', label: '🏙️ Urban Flood' },
  { value: 'ElNinoFlooding', label: '🌧️ El Niño Flooding' },
];

const severities = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const CreateAlert: React.FC = () => {
  const [alertType, setAlertType] = useState('');
  const [severity, setSeverity] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!alertType || !severity || !location) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      alert_type: alertType,
      severity,
      location,
      description,
      status: 'active', // Default status
    };

    try {
      const response = await axios.post('http://localhost:3000/alerts', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Alert created successfully!');
      setAlertType('');
      setSeverity('');
      setLocation('');
      setDescription('');
    } catch (error) {
      console.error('Error creating alert:', error);
      alert('Failed to create the alert. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Create a New Alert</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="alert-type" className="block text-sm font-medium text-gray-700">
              Alert Type
            </label>
            <Select
              id="alert-type"
              value={alertType}
              onValueChange={setAlertType}
              placeholder="Select an alert type"
            >
              {alertTypes.map((type) => (
                <Select.Option key={type.value} value={type.value}>
                  {type.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
              Severity
            </label>
            <Select
              id="severity"
              value={severity}
              onValueChange={setSeverity}
              placeholder="Select severity"
            >
              {severities.map((level) => (
                <Select.Option key={level.value} value={level.value}>
                  {level.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the location"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add an optional description"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg">
            Create Alert
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAlert;
