const express = require("express");
const router = express.Router();
const Delivery = require("../models/delivery");

router.post("/", async (req, res) => {
    const { deliveryMethod, billingDetails } = req.body;

    if (!deliveryMethod || !billingDetails || !billingDetails.name || !billingDetails.address || !billingDetails.email || !billingDetails.phone) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const delivery = new Delivery({
            deliveryMethod,
            billingDetails,
        });
        await delivery.save();
        res.status(200).json({ message: "Delivery information saved successfully!" });
    } catch (error) {
        console.error("Error saving delivery information:", error);
        res.status(500).json({ error: "Failed to save delivery information." });
    }
});

module.exports = router;
