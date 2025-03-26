const { generateOTP, sendOTPEmail } = require('../services/emailService');
const { getDb } = require('../config/db');
const bcrypt = require('bcrypt');

// Temporary OTP storage (use Redis in production)
const otpStore = new Map();

const logout = (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL);
  });
};

const authStatus = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
};

const getUser = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOTP();
  otpStore.set(email, {
    otp,
    timestamp: Date.now(),
    attempts: 0
  });

  const sent = await sendOTPEmail(email, otp);
  
  if (sent) {
    res.json({ message: 'OTP sent successfully' });
  } else {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const storedData = otpStore.get(email);
  
  if (!storedData) {
    return res.status(400).json({ error: 'No OTP found for this email' });
  }

  if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP has expired' });
  }

  if (storedData.attempts >= 3) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'Too many attempts. Please request a new OTP' });
  }

  if (storedData.otp === otp) {
    otpStore.delete(email);
    res.json({ message: 'OTP verified successfully' });
  } else {
    storedData.attempts++;
    res.status(400).json({ error: 'Invalid OTP' });
  }
};

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await db.collection('users').insertOne(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Log the user in using Passport session
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' });
      }
      res.json({ message: 'Logged in successfully', user: { email: user.email, fullName: user.fullName } });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

module.exports = { logout, authStatus, getUser, sendOTP, verifyOTP, signup, login };