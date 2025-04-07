const express = require('express');
const passport = require('../middleware/passport');
const { logout, authStatus, getUser, sendOTP, verifyOTP, signup, login, selectRole,updateCreatedCourses } = require('../controllers/authController');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

router.get('/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    // Generate JWT token for Google OAuth user
    const user = req.user;
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    // Redirect to dashboard with token in query string (or use a different method)
    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
  }
);

router.get('/auth/logout', logout);
router.get('/auth/status', authStatus);
router.get('/api/user', getUser);
router.post('/api/send-otp', sendOTP);
router.post('/api/verify-otp', verifyOTP);
router.post('/api/signup', signup);
router.post('/api/login', login);
router.post('/api/select-role', authenticateJWT, selectRole);
router.post('/api/users/update-created-courses', authenticateJWT, updateCreatedCourses);

module.exports = router;