const Log = require("../models/log.js");

// Create a new log
const createLog = async (req, res) => {
    try {
        const { method, contact, alertType, location, timeSent, status } = req.body;

        const newLog = await Log.create({
            method,
            contact,
            alertType,
            location,
            timeSent,
            status,
        });

        res.status(201).json({ message: "Log created successfully!", log: newLog });
    } catch (error) {
        res.status(500).json({ message: "Error creating log", error });
    }
};

// Get all logs
const getAllLogs = async (req, res) => {
    try {
        const logs = await Log.findAll();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching logs", error });
    }
};

module.exports = { createLog, getAllLogs };