// Import the function to fetch weather data from an external API
const { getWeatherData } = require('../config/externalApis');

// Controller function to handle requests for weather data
const getWeather = async (req, res) => {
    // Extract the location parameter from the request
    const location = req.params.location;
    try {
        // Fetch weather data for the specified location
        const weather = await getWeatherData(location);
        // Respond with the fetched weather data
        res.status(200).json(weather);
    } catch (error) {
        // Handle errors and respond with a failure message
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

// Export the controller function for use in other parts of the application
module.exports = { getWeather };
