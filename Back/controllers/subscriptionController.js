const express = require('express');
const Subscription = require("../models/subscription.js");

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

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subscriptions", error });
    }
};

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

module.exports = { subscribeUser, getAllSubscriptions, updateSubscription, deleteSubscription };