import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:3000/alerts';

// Function to update an alert by ID (PUT request)
export const updateAlertById = async (id: string, alertData: object) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/alerts/${id}`, alertData);
    return response.data;
  } catch (error) {
    console.error('Error updating the alert:', error);
    throw error;
  }
};

// Function to get all alerts (GET request)
export const getAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

// alertService.ts
export const getAlertById = async (id: number) => {
  const response = await fetch(`/alerts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch alert details');
  }
  return response.json();
};




