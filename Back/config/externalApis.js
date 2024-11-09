require('dotenv').config();
const axios = require('axios');

const getEarthquakeData = async () => {
    try {
        const response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
        return response.data;
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        throw error;
    }
};

const getWeatherData = async (location) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

module.exports = { getEarthquakeData, getWeatherData };
