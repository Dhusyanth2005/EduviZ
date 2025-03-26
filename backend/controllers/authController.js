const { generateOTP, sendOTPEmail } = require('../services/emailService');

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

  // Check if OTP has expired (10 minutes)
  if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP has expired' });
  }

  // Check attempts
  if (storedData.attempts >= 3) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'Too many attempts. Please request a new OTP' });
  }

  // Verify OTP
  if (storedData.otp === otp) {
    otpStore.delete(email);
    res.json({ message: 'OTP verified successfully' });
  } else {
    storedData.attempts++;
    res.status(400).json({ error: 'Invalid OTP' });
  }
};

module.exports = { logout, authStatus, getUser, sendOTP, verifyOTP };