const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secret);

// router endpoints
router.post("/intents", async (req, res) => {
  try {
    //create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // in cents
      currency: "usd", // or through req.body
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});
module.exports = router;
