const Subscription = require("../models/subscription.js");
const { sendEmail } = require('../config/mail.js');
const Log = require("../models/log.js");
const AlertLog = require("../models/alertLog.js");
const { Sequelize } = require('sequelize');
const db = require('../config/database');
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

// const getSubscriptionsByLocation = async (req, res) => {
//     try {
//         const { location } = req.query;
//         const reports = await Subscription.findAll({
//             where: {
//                 locations: {
//                     [Sequelize.Op.contains]: [location]
//                 }
//             }
//         });

//         res.status(200).json(subscriptions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const getSubscriptionsByLocations = async (req, res) => {
    try {
        const { location } = req.query;

        if (!location) {
            return res.status(400).json({ error: 'Location parameter is required' });
        }

        const subscriptions = await Subscription.findAll({
            where: Sequelize.where(
                Sequelize.fn('JSON_CONTAINS',
                    Sequelize.col('locations'),
                    Sequelize.literal('?')
                ),
                1
            ),
            replacements: [JSON.stringify(location)],
        });

        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Location filter error:', error);
        res.status(500).json({
            message: "Error filtering by location",
            error: error.message
        });
    }
};

// const getSubscriptionsByLocation = async (req, res) => {
//     try {
//         const subscriptions = await Subscription.findAll();

//         // Group subscriptions by location
//         const groupedSubscriptions = subscriptions.reduce((acc, subscription) => {
//             subscription.locations.forEach((location) => {
//                 if (!acc[location]) {
//                     acc[location] = [];
//                 }
//                 acc[location].push({
//                     id: subscription.id,
//                     method: subscription.method,
//                     contact: subscription.contact,
//                 });
//             });
//             return acc;
//         }, {});

//         res.status(200).json(groupedSubscriptions);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching subscriptions", error });
//     }
// };

const getSubscriptionsByLocation = async (req, res) => {
    try {
      const { location } = req.query;
      if (location) {
        // When a location is provided, filter subscriptions that contain this location
        const subscriptions = await Subscription.findAll({
          where: Sequelize.where(
            Sequelize.fn('JSON_CONTAINS',
              Sequelize.col('locations'),
              Sequelize.literal('?')
            ),
            1
          ),
          replacements: [JSON.stringify(location)],
        });
        return res.status(200).json(subscriptions);
      } else {
        // No query parameter: group all subscriptions by location
        const subscriptions = await Subscription.findAll();
        const groupedSubscriptions = subscriptions.reduce((acc, subscription) => {
          subscription.locations.forEach((loc) => {
            if (!acc[loc]) {
              acc[loc] = [];
            }
            acc[loc].push({
              id: subscription.id,
              method: subscription.method,
              contact: subscription.contact,
              createdAt: subscription.createdAt, // include createdAt if needed
            });
          });
          return acc;
        }, {});
        return res.status(200).json(groupedSubscriptions);
      }
    } catch (error) {
      console.error('Error in getSubscriptionsByLocation:', error);
      return res.status(500).json({ error: error.message });
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
const getSubscriptionsByMonth = async (req, res) => {
    try {
        const { year, month } = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const subscriptions = await Subscription.findAll({
            where: {
                createdAt: {
                    [Sequelize.Op.between]: [startDate, endDate]
                }
            }
        });

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Error filtering by month", error });
    }
};


// Fix method-counts endpoint
const getSubscriptionMethodCounts = async (req, res) => {
    try {
        const methods = await Subscription.findAll({
            attributes: [
                'method',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            group: ['method'],
            raw: true
        });

        res.json(methods.map(m => ({ label: m.method, count: m.count })));
    } catch (error) {
        console.error('Method counts error:', error);
        res.status(500).json({ error: 'Failed to load method counts' });
    }
};

// Fix location-counts endpoint
const getSubscriptionLocationCounts = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();
        const locationCounts = subscriptions.reduce((acc, sub) => {
            sub.locations.forEach(location => {
                if (location && location.trim()) { // Validate location
                    acc[location] = (acc[location] || 0) + 1;
                }
            });
            return acc;
        }, {});

        const formatted = Object.entries(locationCounts)
            .filter(([location]) => location) // Filter empty locations
            .map(([label, count]) => ({ label, count }));

        res.status(200).json(formatted);
    } catch (error) {
        console.error('Error fetching location counts:', error);
        res.status(500).json({
            message: "Error fetching location counts",
            error: error.message
        });
    }
};

module.exports = { subscribeUser, getAllSubscriptions, getSubscriptionsByMonth, updateSubscription, deleteSubscription, getSubscriptionsByLocation, sendEmailAlert, getSubscriptionMethodCounts, getSubscriptionLocationCounts, getSubscriptionsByLocations };