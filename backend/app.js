const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./middleware/passport');
const chatRoutes = require('./routes/chatRoutes');
const modelRoutes = require('./routes/modelRoutes');
const authRoutes = require('./routes/authRoutes');
const { router: paymentRoutes, initializeRazorpay } = require('./routes/paymentRoutes');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();

// Razorpay instance with error handling
let razorpayInstance;
try {
  if (!process.env.RAZORPAY_API_KEY || !process.env.RAZORPAY_API_SECRET) {
    console.error('Razorpay API keys are missing in environment variables');
  } else {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });
    // Initialize the Razorpay instance in the payment routes
    initializeRazorpay(razorpayInstance);
  }
} catch (error) {
  console.error('Failed to initialize Razorpay:', error.message);
}

// CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Session and Passport only for auth routes
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
});

app.use('/auth', sessionMiddleware);
app.use('/auth', passport.initialize());
app.use('/auth', passport.session());

// Routes
app.use(chatRoutes);
app.use(modelRoutes);
app.use(authRoutes);
app.use(paymentRoutes);

module.exports = app;