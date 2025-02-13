const africastalking = require('africastalking');

// Initialize Africa's Talking
const credentials = {
    apiKey: 'YOUR_API_KEY', // Replace with your API key
    username: 'YOUR_USERNAME', // Replace with your username
};

const africasTalking = africastalking(credentials);
const sms = africasTalking.SMS;

// Send SMS Alert
const sendSmsAlert = async (req, res) => {
    const { to, message } = req.body;

    try {
        const options = {
            to: [to], // Array of recipients
            message: message, // SMS content
        };

        // Send SMS
        const response = await sms.send(options);
        console.log('SMS sent successfully:', response);

        res.status(200).json({ message: 'SMS sent successfully!', response });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ error: 'Failed to send SMS', details: error });
    }
};

module.exports = { sendSmsAlert };