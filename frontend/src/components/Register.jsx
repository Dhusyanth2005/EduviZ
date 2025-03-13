import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.elements['full-name'].value; // Assuming full-name input
    const email = e.target.elements['email'].value;
    const password = e.target.elements['password'].value;

    // Simulate registration (replace with real API call)
    console.log('Registering user:', name
    );
    if (name && email && password) {
      localStorage.setItem('userName', name); // Store the user's name
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="auth-page">
      <div className="bg-elements">
        <div className="bg-circle circle1"></div>
        <div className="bg-circle circle2"></div>
        <div className="bg-circle circle3"></div>
      </div>
      <div className="auth-wrapper">
        <motion.div
          className="left-animation"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className="floating-cube">
            <span className="cube-face front"></span>
            <span className="cube-face back"></span>
            <span className="cube-face left"></span>
            <span className="cube-face right"></span>
            <span className="cube-face top"></span>
            <span className="cube-face bottom"></span>
          </div>
        </motion.div>
        <motion.div
          className="auth-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="auth-title">
            Create Account
          </motion.h1>
          <motion.form variants={itemVariants} className="auth-form" onSubmit={handleRegister}>
            <motion.input
              variants={itemVariants}
              type="text"
              name="full-name" // Added name attribute
              placeholder="Full Name"
              className="auth-input"
              whileFocus={{ scale: 1.02, borderColor: 'rgba(56, 189, 248, 0.5)' }}
            />
            <motion.input
              variants={itemVariants}
              type="email"
              name="email"
              placeholder="Email"
              className="auth-input"
              whileFocus={{ scale: 1.02, borderColor: 'rgba(56, 189, 248, 0.5)' }}
            />
            <motion.input
              variants={itemVariants}
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              whileFocus={{ scale: 1.02, borderColor: 'rgba(56, 189, 248, 0.5)' }}
            />
            <motion.button
              variants={itemVariants}
              type="submit"
              className="auth-submit"
              whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </motion.form>
          <motion.div variants={itemVariants} className="social-auth">
            <FcGoogle className="social-icon" />
            <FaLinkedin className="social-icon" />
          </motion.div>
          <motion.p variants={itemVariants} className="auth-switch">
            Already have an account?{' '}
            <a href="/login" className="auth-link">
              Login
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;