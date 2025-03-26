const getAuthStatus = (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ 
        isAuthenticated: true, 
        user: req.user 
      });
    } else {
      res.json({ 
        isAuthenticated: false 
      });
    }
  };
  
  const logout = (req, res) => {
    req.logout(() => {
      res.redirect(process.env.CLIENT_URL);
    });
  };
  
  module.exports = { getAuthStatus, logout };