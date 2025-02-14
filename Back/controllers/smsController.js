const africastalking = require('africastalking');

// Initialize Africa's Talking
const credentials = {
    apiKey: process.env.SMS_API_KEY, // Use environment variable
    username: process.env.SMS_USERNAME, // Use environment variable
};

const africasTalking = africastalking(credentials);
const sms = africasTalking.SMS;

// Send SMS Alert
const sendSmsAlert = async (req, res) => {
    const { to, message } = req.body;

    // Log the request payload for debugging
    console.log('SMS Request Payload:', { to, message });

    try {
        const options = {
            to: [to], // Array of recipients
            message: message, // SMS content
        };

        // Log the options being sent to Africa's Talking
        console.log('Sending SMS with options:', options);

        // Send SMS
        const response = await sms.send(options);
        console.log('SMS sent successfully:', response);

        res.status(200).json({ message: 'SMS sent successfully!', response });
    } catch (error) {
        // Log the full error for debugging
        console.error('Error sending SMS:', {
            message: error.message,
            stack: error.stack,
            details: error.response ? error.response.data : null,
        });

        res.status(500).json({
            error: 'Failed to send SMS',
            details: error.message,
            fullError: process.env.NODE_ENV === 'development' ? error : undefined, // Only include full error in development
        });
    }
};

module.exports = { sendSmsAlert };