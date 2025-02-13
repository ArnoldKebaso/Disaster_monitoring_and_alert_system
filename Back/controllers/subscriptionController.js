const Subscription = require("../models/subscription.js");
const { sendEmail } = require('../config/mail.js');
const Log = require("../models/log.js");
const AlertLog = require("../models/alertLog.js");

// Subscribe a user
const subscribeUser = async (req, res) => {
    try {
        const { method, contact, locations } = req.body;

        if (!method || !contact || !locations || locations.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubscription = await Subscription.create({
            method,
            contact,
            locations, // Store array of locations
        });

        res.status(201).json({ message: "Subscription successful!", subscription: newSubscription });
    } catch (error) {
        res.status(500).json({ message: "Error subscribing user", error });
    }
};

const sendEmailAlert = async (req, res) => {
    const {
        to,
        subject,
        text,
        alertType,
        location,
        description = "", // Default to empty string if not provided
        severity = "", // Default to empty string if not provided
        water_levels = {}, // Default to empty object if not provided
        evacuation_routes = [], // Default to empty array if not provided
        emergency_contacts = [], // Default to empty array if not provided
        precautionary_measures = [], // Default to empty array if not provided
        weather_forecast = {}, // Default to empty object if not provided
    } = req.body;

    try {
        await sendEmail(to, subject, text);

        // Log the successful email alert
        await AlertLog.create({
            method: "email",
            contact: to,
            alertType,
            location,
            description,
            severity,
            water_levels,
            evacuation_routes,
            emergency_contacts,
            precautionary_measures,
            weather_forecast,
            timeSent: new Date(),
            status: "success",
        });

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Error sending email or creating log:", error);

        // Log the failed email alert
        await AlertLog.create({
            method: "email",
            contact: to,
            alertType,
            location,
            description,
            severity,
            water_levels,
            evacuation_routes,
            emergency_contacts,
            precautionary_measures,
            weather_forecast,
            timeSent: new Date(),
            status: "failed",
        });

        res.status(500).json({ error: 'Failed to send email' });
    }
};


// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subscriptions", error });
    }
};

// Get subscriptions grouped by location
const getSubscriptionsByLocation = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();

        // Group subscriptions by location
        const groupedSubscriptions = subscriptions.reduce((acc, subscription) => {
            subscription.locations.forEach((location) => {
                if (!acc[location]) {
                    acc[location] = [];
                }
                acc[location].push({
                    id: subscription.id,
                    method: subscription.method,
                    contact: subscription.contact,
                });
            });
            return acc;
        }, {});

        res.status(200).json(groupedSubscriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subscriptions", error });
    }
};

// Update a subscription
const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const { method, contact, locations } = req.body;

        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        subscription.method = method || subscription.method;
        subscription.contact = contact || subscription.contact;
        subscription.locations = locations || subscription.locations;

        await subscription.save();
        res.status(200).json({ message: "Subscription updated successfully", subscription });
    } catch (error) {
        res.status(500).json({ message: "Error updating subscription", error });
    }
};

// Delete a subscription
const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;

        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        await subscription.destroy();
        res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting subscription", error });
    }
};


// Send email alert
// const sendEmailAlert = async (req, res) => {
//     const { to, subject, text } = req.body;

//     try {
//         await sendEmail(to, subject, text);
//         res.status(200).json({ message: 'Email sent successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to send email' });
//     }
// };



module.exports = { subscribeUser, getAllSubscriptions, updateSubscription, deleteSubscription, getSubscriptionsByLocation, sendEmailAlert };