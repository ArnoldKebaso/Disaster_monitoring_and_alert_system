import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, MapPin, Clock, X, Edit, Trash2, Archive, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useNavigate } from 'react-router-dom';

/**
 * Constants for filter options
 */
const AlertTypes = ['All Types', 'RiverFlood', 'FlashFlood', 'UrbanFlood', 'CoastalFlood', 'ElNinoFlooding'];
const Severities = ['All Severities', 'Low', 'Medium', 'High'];
const TimeFilters = ['All Time', '24h', '48h', '7d'];
const StatusOptions = ['active', 'resolved', 'archived'];

/**
 * Interface defining the structure of an Alert object
 */
interface Alert {
  alert_id: number;
  alert_type: string;
  severity: string;
  location: string;
  description: string;
  water_levels: { current: string; predicted: string };
  evacuation_routes: string[];
  emergency_contacts: string[];
  precautionary_measures: string[];
  weather_forecast: { next_24_hours: string; next_48_hours: string };
  status: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * AdminAlerts Component - Provides an admin interface for managing flood alerts
 * 
 * Features:
 * - View, filter, and search alerts by location
 * - Create, edit, archive, and delete alerts
 * - Detailed alert viewing
 * - Admin-specific functionality toggle
 * 
 * @param {boolean} isAdmin - Determines if admin features should be shown (default: true)
 */
const AdminAlerts: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = true }) => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All Types');
  const [activeSeverity, setActiveSeverity] = useState('All Severities');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedTime, setSelectedTime] = useState('All Time');
  const [showArchived, setShowArchived] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Fetch initial data (locations and alerts) on component mount
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch available locations
        const locationsResponse = await fetch('http://localhost:3000/alerts/locales');
        const locationsData = await locationsResponse.json();
        setLocations(Array.isArray(locationsData) ? locationsData : []);
        
        // Fetch all alerts
        const alertsResponse = await fetch('http://localhost:3000/alerts');
        const alertsData = await alertsResponse.json();
        setAlerts(alertsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setLocationsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  /**
   * Fetch alerts when selected location or archived toggle changes
   */
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const url = new URL('http://localhost:3000/alerts');
        if (selectedLocation) url.searchParams.set('location', selectedLocation);
        if (showArchived) url.searchParams.set('includeArchived', 'true');

        const response = await fetch(url.toString());
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, [selectedLocation, showArchived]);

  /**
   * Format timestamp to readable date string
   * @param {string} timestamp - The timestamp to format
   * @returns {string} Formatted date string
   */
  const formatDate = (timestamp: string) => new Date(timestamp).toLocaleString();

  /**
   * Mapping of time filters to milliseconds
   */
  const timeFilterMap = {
    '24h': 24 * 60 * 60 * 1000,
    '48h': 48 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
  };

  /**
   * Navigate to create alert page
   */
  const handleClick = () => {
    navigate('/createAlert');
  };

  /**
   * Filter alerts based on current filter selections
   */
  const filteredAlerts = alerts.filter(alert => {
    const location = alert.location?.toLowerCase() || '';
    const search = searchQuery.toLowerCase();
    const matchesSearch = location.includes(search);
    const matchesType = activeType === 'All Types' || alert.alert_type === activeType;
    const matchesSeverity = activeSeverity === 'All Severities' || alert.severity === activeSeverity;
    const alertDate = new Date(alert.createdAt);
    const matchesMonth = selectedMonth === 'All Months' || 
      alertDate.toLocaleString('default', { month: 'long' }) === selectedMonth;
    const timeDiff = Date.now() - alertDate.getTime();
    const matchesTime = selectedTime === 'All Time' || 
      (timeFilterMap[selectedTime as keyof typeof timeFilterMap] && 
       timeDiff <= timeFilterMap[selectedTime as keyof typeof timeFilterMap]);
    return matchesSearch && matchesType && matchesSeverity && matchesMonth && matchesTime;
  });

  /**
   * Delete an alert
   * @param {number} alertId - ID of the alert to delete
   */
  const handleDelete = async (alertId: number) => {
    try {
      await fetch(`http://localhost:3000/alerts/${alertId}`, { method: 'DELETE' });
      setAlerts(alerts.filter(a => a.alert_id !== alertId));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  /**
   * Archive an alert
   * @param {number} alertId - ID of the alert to archive
   */
  const handleArchive = async (alertId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/alerts/${alertId}/archive`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to archive alert');
      }
      const updatedAlert = await response.json();
      setAlerts(alerts.map(a => a.alert_id === alertId ? updatedAlert : a));
    } catch (error) {
      console.error('Archive failed:', error);
      alert(error.message);
    }
  };

  /**
   * Unarchive an alert
   * @param {number} alertId - ID of the alert to unarchive
   */
  const handleUnarchive = async (alertId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/alerts/${alertId}/unarchive`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to unarchive alert');
      }
      const updatedAlert = await response.json();
      setAlerts(alerts.map(a => a.alert_id === alertId ? updatedAlert : a));
    } catch (error) {
      console.error('Unarchive failed:', error);
      alert(error.message);
    }
  };

  /**
   * Update an alert
   * @param {Alert} updatedAlert - The updated alert object
   */
  const handleUpdate = async (updatedAlert: Alert) => {
    try {
      const response = await fetch(`http://localhost:3000/alerts/${updatedAlert.alert_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAlert)
      });
      const data = await response.json();
      setAlerts(alerts.map(a => a.alert_id === data.alert_id ? data : a));
      setEditingAlert(null);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // Show loading state while data is being fetched
  if (locationsLoading || loading) {
    return <div className="text-center text-gray-500 p-6">Loading data...</div>;
  }

  // ===================== LOCATION SELECTION SCREEN =====================
  if (!selectedLocation) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Select Location</h1>
            {isAdmin && (
              <Button onClick={() => window.location.href = '/createAlert'} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" /> Create New Alert
              </Button>
            )}
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {locations.map(location => (
              <Card 
                key={location} 
                onClick={() => setSelectedLocation(location)} 
                className="cursor-pointer hover:shadow-lg"
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{location}</h3>
                  <p className="text-sm text-gray-600">
                    {alerts.filter(a => a.location === location).length} active alerts
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===================== MAIN ALERTS SCREEN =====================
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Alerts for {selectedLocation}
            {isAdmin && ' (Admin View)'}
          </h1>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => {
                setSelectedLocation(null);
                setSearchQuery('');
                setActiveType('All Types');
                setActiveSeverity('All Severities');
              }}
              variant="outline"
            >
              <X className="mr-2 h-4 w-4" /> Back to Locations
            </Button>
            {isAdmin && (
              <Button onClick={handleClick} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" /> Create Alert
              </Button>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          {/* Top Filter Row */}
          <div className="flex flex-wrap gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Input
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Archived Toggle (Admin Only) */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                <Label htmlFor="archived-toggle">Show Archived</Label>
                <Switch
                  id="archived-toggle"
                  checked={showArchived}
                  onCheckedChange={setShowArchived}
                />
              </div>
            )}

            {/* Month Selector */}
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Months">All Months</SelectItem>
                {Array.from({ length: 12 }).map((_, i) => (
                  <SelectItem 
                    key={i}
                    value={new Date(0, i).toLocaleString('default', { month: 'long' })}
                  >
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Time Range Selector */}
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Time Range" />
              </SelectTrigger>
              <SelectContent>
                {TimeFilters.map(filter => (
                  <SelectItem key={filter} value={filter}>{filter}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters Button */}
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setActiveType('All Types');
                setActiveSeverity('All Severities');
                setSelectedMonth('All Months');
                setSelectedTime('All Time');
              }}
            >
              Clear Filters
            </Button>
          </div>

          {/* Alert Type Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {AlertTypes.map(type => (
              <Button
                key={type}
                variant={activeType === type ? 'default' : 'outline'}
                onClick={() => setActiveType(type)}
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Severity Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {Severities.map(severity => (
              <Button
                key={severity}
                variant={activeSeverity === severity ? 'default' : 'outline'}
                onClick={() => setActiveSeverity(severity)}
              >
                {severity}
              </Button>
            ))}
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlerts.map(alert => (
            <Card key={alert.alert_id} className="relative hover:shadow-lg">
              {/* Archived Badge */}
              {alert.status === 'archived' && (
                <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  Archived
                </div>
              )}
              
              <CardContent className="p-4">
                {/* Alert Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <AlertTriangle
                      className={`mr-2 h-6 w-6 ${
                        alert.severity === 'High'
                          ? 'text-red-500'
                          : alert.severity === 'Medium'
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{alert.alert_type}</h3>
                      <p className="text-sm text-gray-600">{alert.location}</p>
                    </div>
                  </div>
                  
                  {/* Admin Actions */}
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setEditingAlert(alert)} title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {alert.status === 'archived' ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUnarchive(alert.alert_id)}
                          title="Unarchive"
                        >
                          <Archive className="h-4 w-4 rotate-180" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleArchive(alert.alert_id)}
                          title="Archive"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(alert.alert_id)} title="Delete">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Alert Details */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    Severity: <span className="font-bold">{alert.severity}</span>
                  </p>
                  <p className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                    {formatDate(alert.createdAt)}
                  </p>
                  <Button className="w-full mt-4" onClick={() => setSelectedAlert(alert)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===================== EDIT ALERT MODAL ===================== */}
        {editingAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Alert</h2>
                <Button variant="ghost" size="icon" onClick={() => setEditingAlert(null)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label>Alert Type</Label>
                    <Select
                      value={editingAlert.alert_type}
                      onValueChange={value => setEditingAlert({ ...editingAlert, alert_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {AlertTypes.filter(t => t !== 'All Types').map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Severity</Label>
                    <Select
                      value={editingAlert.severity}
                      onValueChange={value => setEditingAlert({ ...editingAlert, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {Severities.filter(s => s !== 'All Severities').map(severity => (
                          <SelectItem key={severity} value={severity}>{severity}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input
                      value={editingAlert.location}
                      onChange={e => setEditingAlert({ ...editingAlert, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editingAlert.status}
                      onValueChange={value => setEditingAlert({ ...editingAlert, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {StatusOptions.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingAlert.description}
                      onChange={e => setEditingAlert({ ...editingAlert, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Water Levels (Current)</Label>
                    <Input
                      value={editingAlert.water_levels.current}
                      onChange={e => setEditingAlert({
                        ...editingAlert,
                        water_levels: { ...editingAlert.water_levels, current: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <Label>Water Levels (Predicted)</Label>
                    <Input
                      value={editingAlert.water_levels.predicted}
                      onChange={e => setEditingAlert({
                        ...editingAlert,
                        water_levels: { ...editingAlert.water_levels, predicted: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" onClick={() => setEditingAlert(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdate(editingAlert)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== ALERT DETAILS MODAL ===================== */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedAlert.alert_type} Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedAlert(null)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-4">
                <DetailItem label="Severity" value={selectedAlert.severity} />
                <DetailItem label="Location" value={selectedAlert.location} />
                <DetailItem label="Description" value={selectedAlert.description} />
                <DetailItem 
                  label="Water Levels" 
                  value={`Current: ${selectedAlert.water_levels.current}, Predicted: ${selectedAlert.water_levels.predicted}`}
                />
                <DetailItem
                  label="Evacuation Routes"
                  value={selectedAlert.evacuation_routes.join(', ')}
                />
                <DetailItem
                  label="Emergency Contacts"
                  value={selectedAlert.emergency_contacts.join(', ')}
                />
                <DetailItem
                  label="Precautionary Measures"
                  value={selectedAlert.precautionary_measures.join(', ')}
                />
                <DetailItem
                  label="Weather Forecast"
                  value={`24h: ${selectedAlert.weather_forecast.next_24_hours}, 48h: ${selectedAlert.weather_forecast.next_48_hours}`}
                />
                <DetailItem label="Status" value={selectedAlert.status} />
                <DetailItem label="Created At" value={formatDate(selectedAlert.createdAt)} />
                <DetailItem label="Updated At" value={formatDate(selectedAlert.updatedAt)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * DetailItem Component - Displays a label-value pair in a consistent format
 * 
 * @param {string} label - The label text
 * @param {string} value - The value text
 */
const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-sm">
    <span className="font-bold text-gray-800">{label}:</span>
    <p className="text-gray-600 mt-1">{value}</p>
  </div>
);

export default AdminAlerts;