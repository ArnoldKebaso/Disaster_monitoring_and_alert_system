const axios = require('axios');
const { generatePassword } = require('../utils/mpesaHelpers');

exports.initiateSTKPush = async (req, res) => {
    try {
        const { phone, amount } = req.body;
        const timestamp = new Date()
            .toISOString()
            .replace(/[^0-9]/g, '')
            .slice(0, -3);

        const auth = Buffer.from(
            `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
        ).toString('base64');

        // Get access token
        const authResponse = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: { Authorization: `Basic ${auth}` }
            }
        );

        const access_token = authResponse.data.access_token;

        // Initiate payment
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                BusinessShortCode: process.env.LIPANAMPESA_SHORTCODE,
                Password: generatePassword(
                    process.env.LIPANAMPESA_SHORTCODE,
                    process.env.LIPANAMPESA_PASSKEY,
                    timestamp
                ),
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phone,
                PartyB: process.env.LIPANAMPESA_SHORTCODE,
                PhoneNumber: phone,
                CallBackURL: process.env.CALLBACK_URL,
                AccountReference: 'BizName',
                TransactionDesc: 'Payment'
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};