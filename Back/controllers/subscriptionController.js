const Subscription = require("../models/Subscription");

// Create a new subscription
exports.createSubscription = async (req, res) => {
    try {
        const { method, contact, locations } = req.body;

        if (!method || !contact || !locations || locations.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const subscription = await Subscription.create({ method, contact, locations });
        res.status(201).json({ message: "Subscription created successfully", subscription });
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get subscription by ID
exports.getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findByPk(req.params.id);
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json(subscription);
    } catch (error) {
        console.error("Error fetching subscription:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a subscription
exports.updateSubscription = async (req, res) => {
    try {
        const { method, contact, locations } = req.body;
        const subscription = await Subscription.findByPk(req.params.id);

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        subscription.method = method || subscription.method;
        subscription.contact = contact || subscription.contact;
        subscription.locations = locations || subscription.locations;

        await subscription.save();
        res.status(200).json({ message: "Subscription updated successfully", subscription });
    } catch (error) {
        console.error("Error updating subscription:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByPk(req.params.id);
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        await subscription.destroy();
        res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (error) {
        console.error("Error deleting subscription:", error);
        res.status(500).json({ message: "Server error" });
    }
};
