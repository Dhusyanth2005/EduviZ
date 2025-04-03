const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Store razorpay instance reference
let razorpayInstance;

// Initialize Razorpay - call this function from app.js
const initializeRazorpay = (instance) => {
  razorpayInstance = instance;
};

// Process payment and create order
router.post('/api/payment/process', async (req, res) => {
  if (!razorpayInstance) {
    return res.status(503).json({
      success: false,
      message: 'Payment service unavailable: Razorpay not initialized',
    });
  }
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// Get Razorpay API key
router.get('/api/payment/key', async (req, res) => {
  if (!process.env.RAZORPAY_API_KEY) {
    return res.status(503).json({
      success: false,
      message: 'Payment service unavailable: API key not configured',
    });
  }
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
});

// Verify payment
router.post('/api/payment/verification', (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required Razorpay parameters",
      });
    }
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (isAuthentic) {
      return res.redirect(
        `${process.env.CLIENT_URL || 'http://localhost:8080'}/paymentSuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed: Invalid signature",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
});

module.exports = { router, initializeRazorpay };