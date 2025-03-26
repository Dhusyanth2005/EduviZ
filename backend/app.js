const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./middleware/passport');
const chatRoutes = require('./routes/chatRoutes');
const modelRoutes = require('./routes/modelRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
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

// Public routes (no session required)
app.use(chatRoutes);
app.use(modelRoutes);
app.use(authRoutes);

module.exports = app;