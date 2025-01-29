import React, { useState } from 'react';
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

const severities = ['Low', 'Medium', 'High'];

const CreateAlert: React.FC = () => {
  const [alertType, setAlertType] = useState('');
  const [severity, setSeverity] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      status: 'active',
    };

    setLoading(true);

    try {
      await axios.post('http://localhost:3000/alerts', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Alert created successfully!');
      setAlertType('');
      setSeverity('');
      setLocation('');
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
              placeholder="Select severity level"
            >
              {severities.map((level) => (
                <Select.Option key={level} value={level}>
                  {level}
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
              required
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
