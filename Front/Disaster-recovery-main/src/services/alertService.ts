import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your API's base URL

// const API_URL = process.env.REACT_APP_API_URL;
// fetch(`${API_URL}/your-endpoint`, options);

const API_URL = process.env.REACT_APP_API_URL;
export const getAlertById = async (id: number) => { // add type for 'id'
  const response = await fetch(`${API_URL}/alerts/${id}`);
  return response.json();
};


// Function to update an alert by ID
export const updateAlertById = async (id: string, alertData: object) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/alerts/${id}`, alertData);
    return response.data;
  } catch (error) {
    console.error('Error updating the alert:', error);
    throw error;
  }
};

// Function to fetch alerts (GET request)
export const getAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};
