require('dotenv').config();
const axios = require('axios');

const TEXTSMS_API_KEY = process.env.TEXTSMS_API_KEY;
const TEXTSMS_PARTNER_ID = process.env.TEXTSMS_PARTNER_ID;
const TEXTSMS_SHORTCODE = process.env.TEXTSMS_SHORTCODE;

const sendSmsAlert = async (req, res) => {
    const { to, message } = req.body;

    // Validate input
    if (!to || !message) {
        return res.status(400).json({ error: 'Phone number and message are required.' });
    }

    try {
        const response = await axios.post(
            'https://sms.textsms.co.ke/api/services/sendsms/', // Correct API endpoint
            {
                apikey: TEXTSMS_API_KEY,
                partnerID: TEXTSMS_PARTNER_ID,
                message: message,
                shortcode: TEXTSMS_SHORTCODE,
                mobile: to,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Check if the response is successful
        if (response.data.responses[0]['response-code'] === 200) { // Correct key: 'response-code'
            console.log('SMS sent successfully:', response.data);
            return res.status(200).json({ message: 'SMS sent successfully!', response: response.data });
        } else {
            console.error('Failed to send SMS:', response.data);
            return res.status(500).json({ error: 'Failed to send SMS', details: response.data });
        }
    } catch (error) {
        console.error('Error sending SMS:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Failed to send SMS', details: error.response ? error.response.data : error.message });
    }
};

module.exports = { sendSmsAlert };