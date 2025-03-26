const express = require('express');
const passport = require('../middleware/passport');
const { logout, authStatus, getUser, sendOTP, verifyOTP } = require('../controllers/authController');
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/auth/google/callback', passport.authenticate('google', { 
  failureRedirect: `${process.env.CLIENT_URL}/login`,
  successRedirect: `${process.env.CLIENT_URL}/dashboard`
}));

router.get('/auth/logout', logout);
router.get('/auth/status', authStatus);
router.get('/api/user', getUser);
router.post('/api/send-otp', sendOTP);
router.post('/api/verify-otp', verifyOTP);

module.exports = router;