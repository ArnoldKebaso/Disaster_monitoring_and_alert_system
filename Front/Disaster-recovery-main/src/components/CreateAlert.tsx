import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller, FieldError } from 'react-hook-form';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

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
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
const onSubmit = async (data: any) => {
  setLoading(true);
  try {
    const payload = {
      alert_type: data.alert_type.value,
      severity: data.severity.value,
      location: data.location.value,
      description: data.description,
      water_levels: {
        current: data.current_water_level,
        predicted: data.predicted_water_level,
      },
      evacuation_routes: data.evacuation_routes.split('\n').filter((route: string) => route.trim()),
      emergency_contacts: data.emergency_contacts.split('\n').filter((contact: string) => contact.trim()),
      precautionary_measures: data.precautionary_measures.split('\n').filter((measure: string) => measure.trim()),
      weather_forecast: {
        next_24_hours: data.next_24_hours_forecast,
        next_48_hours: data.next_48_hours_forecast,
      },
      status: 'active',
    };

    console.log('Payload:', payload); // Log the payload for debugging

    await axios.post('http://localhost:3000/alerts', payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    toast.success('Alert created successfully!');
  } catch (error) {
    console.error('Error creating alert:', error);
    toast.error('Failed to create the alert.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create a New Alert</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Alert Type */}
          <div>
            <label htmlFor="alert-type" className="block text-sm font-medium text-gray-700">
              Alert Type
            </label>
            <Controller
              name="alert_type"
              control={control}
              rules={{ required: 'Alert type is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={alertTypes}
                  placeholder="Select an alert type"
                  className="basic-single-select"
                  classNamePrefix="select"
                  getOptionLabel={(option) => `${option.label} - ${option.description}`}
                  getOptionValue={(option) => option.value}
                />
              )}
            />
            {errors.alert_type && (
              <p className="text-red-500 text-sm mt-1">{(errors.alert_type as FieldError).message}</p>
            )}
          </div>

          {/* Severity */}
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
              Severity
            </label>
            <Controller
              name="severity"
              control={control}
              rules={{ required: 'Severity is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={severities.map((level) => ({ value: level, label: level }))}
                  placeholder="Select severity level"
                  className="basic-single-select"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.severity && (
              <p className="text-red-500 text-sm mt-1">{(errors.severity as FieldError).message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <Controller
              name="location"
              control={control}
              rules={{ required: 'Location is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={locationOptions}
                  placeholder="Select a location"
                  className="basic-single-select"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{(errors.location as FieldError).message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Provide additional details about the alert"
                  rows={4}
                />
              )}
            />
          </div>

          {/* Current Water Level */}
          <div>
            <label htmlFor="current_water_level" className="block text-sm font-medium text-gray-700">
              Current Water Level
            </label>
            <Controller
              name="current_water_level"
              control={control}
              rules={{ required: 'Current water level is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="e.g., 4.5 meters"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.current_water_level && (
              <p className="text-red-500 text-sm mt-1">{(errors.current_water_level as FieldError).message}</p>
            )}
          </div>

          {/* Predicted Water Level */}
          <div>
            <label htmlFor="predicted_water_level" className="block text-sm font-medium text-gray-700">
              Predicted Water Level (in 24 hours)
            </label>
            <Controller
              name="predicted_water_level"
              control={control}
              rules={{ required: 'Predicted water level is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="e.g., 5.2 meters"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.predicted_water_level && (
              <p className="text-red-500 text-sm mt-1">{(errors.predicted_water_level as FieldError).message}</p>
            )}
          </div>

          {/* Evacuation Routes */}
          <div>
            <label htmlFor="evacuation_routes" className="block text-sm font-medium text-gray-700">
              Evacuation Routes (one per line)
            </label>
            <Controller
              name="evacuation_routes"
              control={control}
              rules={{ required: 'Evacuation routes are required' }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="e.g., From Bunyala to Busia via Budalangi-Busia Road"
                  rows={4}
                />
              )}
            />
            {errors.evacuation_routes && (
              <p className="text-red-500 text-sm mt-1">{(errors.evacuation_routes as FieldError).message}</p>
            )}
          </div>

          {/* Emergency Contacts */}
          <div>
            <label htmlFor="emergency_contacts" className="block text-sm font-medium text-gray-700">
              Emergency Contacts (one per line)
            </label>
            <Controller
              name="emergency_contacts"
              control={control}
              rules={{ required: 'Emergency contacts are required' }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="e.g., Budalangi Sub-County Office: +254 712 345 678"
                  rows={4}
                />
              )}
            />
            {errors.emergency_contacts && (
              <p className="text-red-500 text-sm mt-1">{(errors.emergency_contacts as FieldError).message}</p>
            )}
          </div>

          {/* Precautionary Measures */}
          <div>
            <label htmlFor="precautionary_measures" className="block text-sm font-medium text-gray-700">
              Precautionary Measures (one per line)
            </label>
            <Controller
              name="precautionary_measures"
              control={control}
              rules={{ required: 'Precautionary measures are required' }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="e.g., Move to higher ground immediately."
                  rows={4}
                />
              )}
            />
            {errors.precautionary_measures && (
              <p className="text-red-500 text-sm mt-1">{(errors.precautionary_measures as FieldError).message}</p>
            )}
          </div>

          {/* Weather Forecast - Next 24 Hours */}
          <div>
            <label htmlFor="next_24_hours_forecast" className="block text-sm font-medium text-gray-700">
              Weather Forecast (Next 24 Hours)
            </label>
            <Controller
              name="next_24_hours_forecast"
              control={control}
              rules={{ required: 'Weather forecast is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="e.g., Heavy rainfall expected, with up to 50mm of precipitation."
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.next_24_hours_forecast && (
              <p className="text-red-500 text-sm mt-1">{(errors.next_24_hours_forecast as FieldError).message}</p>
            )}
          </div>

          {/* Weather Forecast - Next 48 Hours */}
          <div>
            <label htmlFor="next_48_hours_forecast" className="block text-sm font-medium text-gray-700">
              Weather Forecast (Next 48 Hours)
            </label>
            <Controller
              name="next_48_hours_forecast"
              control={control}
              rules={{ required: 'Weather forecast is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="e.g., Moderate rainfall expected, with up to 30mm of precipitation."
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.next_48_hours_forecast && (
              <p className="text-red-500 text-sm mt-1">{(errors.next_48_hours_forecast as FieldError).message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full py-3 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? (
              <>
                <ClipLoader size={20} color="#ffffff" className="mr-2" />
                Creating Alert...
              </>
            ) : (
              'Create Alert'
            )}
          </Button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default CreateAlert;