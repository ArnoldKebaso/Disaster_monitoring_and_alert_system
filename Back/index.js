
import axios from 'axios';

const axios = require('axios').default;

const API_BASE_URL = 'http://localhost:3000/alerts';

const getUserData = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;  // Propagate error to be handled by calling function
    }
};
