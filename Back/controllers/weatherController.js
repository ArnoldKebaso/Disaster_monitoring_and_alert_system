const { getWeatherData } = require('../config/externalApis');

const getWeather = async (req, res) => {
    const location = req.params.location;
    try {
        const weather = await getWeatherData(location);
        res.status(200).json(weather);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

module.exports = { getWeather };
