// controllers/subscriptionController.js

// Import the NewsletterSubscription model
const NewsletterSubscription = require('../models/newsletterSubscription');

// Function to handle creating a new subscription
const createSubscription = async (req, res) => {
  try {
    // Extract email from the request body
    const { email } = req.body;

    // Check if email is provided in the request
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if the email is already subscribed
    const existingSubscription = await NewsletterSubscription.findOne({ where: { email } });
    if (existingSubscription) {
      return res.status(400).json({ error: "This email is already subscribed." });
    }

    // Create a new subscription with the provided email
    const subscription = await NewsletterSubscription.create({ email });

    // Respond with a success message and the subscription details
    return res.status(201).json({
      message: "Subscription successful.",
      subscription,
    });
  } catch (error) {
    // Log the error and respond with a server error message
    console.error("Error creating subscription:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Export the createSubscription function for use in other parts of the application
module.exports = { createSubscription };
