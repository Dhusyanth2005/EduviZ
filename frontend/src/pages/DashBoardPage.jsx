import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Typing animation variants
  const typingVariants = {
    hidden: { width: 0 },
    visible: (i) => ({
      width: 'auto',
      transition: {
        duration: 0.2 * i, // Delay based on character index
        ease: 'linear',
      },
    }),
  };

  const userName = localStorage.getItem('userName') || 'User'; // Default to 'User' if no name

  return (
    <div className="dashboard-page">
      <div className="bg-elements">
        <div className="bg-circle circle1"></div>
        <div className="bg-circle circle2"></div>
        <div className="bg-circle circle3"></div>
      </div>
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <motion.div
          className="sidebar"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="logo">EduViz</div>
          <nav className="sidebar-nav">
            <a href="/dashboard" className="nav-link active">
              Home
            </a>
            <a href="/saved-models" className="nav-link">
              Saved Models
            </a>
            <a href="/settings" className="nav-link">
              Settings
            </a>
          </nav>
          <button className="logout-button">Logout</button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="main-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="header">
            <motion.h1 variants={itemVariants} className="welcome-message">
              <span>Welcome </span>
              {userName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={typingVariants}
                  initial="hidden"
                  animate="visible"
                  className="typing-char"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="cursor"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { repeat: Infinity, duration: 0.7 } },
                }}
                initial="hidden"
                animate="visible"
              >
                |
              </motion.span>
            </motion.h1>
            <motion.button variants={itemVariants} className="profile-button">
              Profile
            </motion.button>
          </div>
          <motion.div variants={itemVariants} className="models-grid">
            <div className="model-card">
              <div className="model-placeholder">3D</div>
              <p>Name of the Model</p>
            </div>
            <div className="model-card">
              <div className="model-placeholder">3D</div>
              <p>Name of the Model</p>
            </div>
            <div className="model-card">
              <div className="model-placeholder">3D</div>
              <p>Name of the Model</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;