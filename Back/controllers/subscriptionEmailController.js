// controllers/subscriptionController.js
const NewsletterSubscription = require('../models/newsletterSubscription');

const createSubscription = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Optionally, check if the email is already subscribed
    const existingSubscription = await NewsletterSubscription.findOne({ where: { email } });
    if (existingSubscription) {
      return res.status(400).json({ error: "This email is already subscribed." });
    }

    const subscription = await NewsletterSubscription.create({ email });
    return res.status(201).json({
      message: "Subscription successful.",
      subscription,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createSubscription };
