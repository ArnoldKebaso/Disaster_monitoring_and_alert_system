require('dotenv').config(); // Load environment variables from .env file
const axios = require('axios'); // Import Axios for making HTTP requests

// Environment variables for the SMS API
const TEXTSMS_API_KEY = process.env.TEXTSMS_API_KEY;
const TEXTSMS_PARTNER_ID = process.env.TEXTSMS_PARTNER_ID;
const TEXTSMS_SHORTCODE = process.env.TEXTSMS_SHORTCODE;

// Function to send SMS alerts
const sendSmsAlert = async (req, res) => {
    const { to, message } = req.body; // Extract phone number and message from the request body

    // Validate input
    if (!to || !message) {
        return res.status(400).json({ error: 'Phone number and message are required.' }); // Return error if input is invalid
    }

    try {
        // Make a POST request to the SMS API
        const response = await axios.post(
            'https://sms.textsms.co.ke/api/services/sendsms/', // Correct API endpoint
            {
                apikey: TEXTSMS_API_KEY, // API key for authentication
                partnerID: TEXTSMS_PARTNER_ID, // Partner ID for the SMS service
                message: message, // Message to be sent
                shortcode: TEXTSMS_SHORTCODE, // Shortcode for the SMS service
                mobile: to, // Recipient's phone number
            },
            {
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
            }
        );

        // Check if the response is successful
        if (response.data.responses[0]['response-code'] === 200) { // Correct key: 'response-code'
            console.log('SMS sent successfully:', response.data); // Log success message
            return res.status(200).json({ message: 'SMS sent successfully!', response: response.data }); // Return success response
        } else {
            console.error('Failed to send SMS:', response.data); // Log failure message
            return res.status(500).json({ error: 'Failed to send SMS', details: response.data }); // Return error response
        }
    } catch (error) {
        // Handle errors during the API call
        console.error('Error sending SMS:', error.response ? error.response.data : error.message); // Log error details
        return res.status(500).json({ error: 'Failed to send SMS', details: error.response ? error.response.data : error.message }); // Return error response
    }
};

module.exports = { sendSmsAlert }; // Export the sendSmsAlert function