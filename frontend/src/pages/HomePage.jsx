import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible");
    
    // Intersection Observer for scroll animations
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animated-section');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (sectionTop < triggerPoint) {
          section.classList.add('animate');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1,
        ease: "easeOut" 
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: custom => ({
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: custom * 0.2,
        ease: "easeOut"
      }
    }),
    hover: { 
      scale: 1.05, 
      y: -10,
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.12)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 15px 35px rgba(59, 130, 246, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)",
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: custom => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="home-container">
      {/* Animated Background Elements */}
      <div className="bg-elements">
        <div className="bg-circle circle1"></div>
        <div className="bg-circle circle2"></div>
        <div className="bg-circle circle3"></div>
      </div>
      
      <header className="header">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          EduViz
        </motion.div>
        <div className="auth-buttons">
          <Link to="/login">
            <motion.button
              className="auth-button login"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Login
            </motion.button>
          </Link>
          <Link to="/Register">
            <motion.button
              className="auth-button signup"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              SignUp
            </motion.button>
          </Link>
        </div>
      </header>

      <motion.section
        className="hero-section animated-section"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Welcome to <span className="highlight">EduViz</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            The Ultimate 3D Learning Platform for Interactive Education
          </motion.p>
          <motion.button
            className="cta-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Get Started
          </motion.button>
        </div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="floating-3d-model"></div>
        </motion.div>
      </motion.section>

      <motion.section 
        className="about-section animated-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
      >
        <motion.h2
          custom={0}
          variants={fadeInUpVariants}
        >
          About Us
        </motion.h2>
        <motion.p
          custom={1}
          variants={fadeInUpVariants}
        >
          EduViz is dedicated to revolutionizing education through cutting-edge 3D technology. 
          Founded with a vision to make learning interactive and accessible, we provide tools for 
          students, professionals, and educators across industries like engineering, medical sciences, 
          and architecture. Our mission is to bridge the gap between theory and practice with 
          innovative, web-based solutions.
        </motion.p>
        
        <motion.div 
          className="about-stats"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="stat-item" variants={cardVariants} custom={0}>
            <span className="stat-number">10,000+</span>
            <span className="stat-label">Active Users</span>
          </motion.div>
          <motion.div className="stat-item" variants={cardVariants} custom={1}>
            <span className="stat-number">200+</span>
            <span className="stat-label">3D Models</span>
          </motion.div>
          <motion.div className="stat-item" variants={cardVariants} custom={2}>
            <span className="stat-number">50+</span>
            <span className="stat-label">Educational Institutions</span>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        className="features-section animated-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUpVariants}
      >
        <motion.h2
          custom={0}
          variants={fadeInUpVariants}
        >
          Why Choose EduViz?
        </motion.h2>
        <div className="features-grid">
          {[
            {
              title: "Realistic 3D Models",
              description: "Rotate, zoom, and inspect objects dynamically with crystal-clear details and realistic textures.",
              icon: "🔍"
            },
            {
              title: "Step-by-Step Dismantling",
              description: "Breakdown and rebuild complex structures layer by layer to understand internal components.",
              icon: "🔧"
            },
            {
              title: "Real-Time Simulations",
              description: "Visualize workflows like engine operations or anatomy functions in real-time interactive environments.",
              icon: "⚙️"
            },
            {
              title: "Cross-Industry Applications",
              description: "Perfect for engineering, medical sciences, architecture, and many more educational fields.",
              icon: "🏛️"
            },
            {
              title: "No AR/VR Needed",
              description: "Works on any modern web browser without requiring special hardware or software installations.",
              icon: "💻"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              custom={index}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="feature-icon">{feature.icon}</div>
              <motion.h3>{feature.title}</motion.h3>
              <motion.p>{feature.description}</motion.p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="testimonials-section animated-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUpVariants}
      >
        <motion.h2 custom={0} variants={fadeInUpVariants}>
          What Our Users Say
        </motion.h2>
        <div className="testimonials-slider">
          {[
            {
              name: "Dr. Sarah Johnson",
              role: "Medical Professor",
              text: "EduViz has transformed how I teach anatomy to medical students. The interactive 3D models make complex structures much easier to understand."
            },
            {
              name: "Prof. Michael Chen",
              role: "Engineering Educator",
              text: "The ability to dismantle and explore engineering components has significantly improved my students' understanding of mechanical systems."
            },
            {
              name: "Amanda Lewis",
              role: "Architecture Student",
              text: "As a visual learner, EduViz has been invaluable for my architectural studies. Being able to explore buildings in 3D gives me insights I couldn't get from textbooks."
            },
            {
              name: "Prof. Michael Chen",
              role: "Engineering Educator",
              text: "The ability to dismantle and explore engineering components has significantly improved my students' understanding of mechanical systems."
            },
            {
              name: "Prof. Michael Chen",
              role: "Engineering Educator",
              text: "The ability to dismantle and explore engineering components has significantly improved my students' understanding of mechanical systems."
            }
          ].map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card"
              custom={index}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="testimonial-content">
                <p>"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="contact-section animated-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUpVariants}
      >
        <motion.h2 custom={0} variants={fadeInUpVariants}>
          Contact Us
        </motion.h2>
        <motion.p custom={1} variants={fadeInUpVariants}>
          Have questions or need support? Reach out to us at:
          <br />
          Email: support@eduviz.com
          <br />
          Phone: +1-800-EDUVIZ
          <br />
          Address: 123 Learning Lane, Tech City, TC 12345
        </motion.p>
        <motion.form
          custom={2}
          variants={fadeInUpVariants}
          className="contact-form"
        >
          <motion.input 
            type="text" 
            placeholder="Your Name" 
            required 
            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)" }}
          />
          <motion.input 
            type="email" 
            placeholder="Your Email" 
            required
            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)" }}
          />
          <motion.textarea 
            placeholder="Your Message" 
            required
            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)" }}
          ></motion.textarea>
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Send Message
          </motion.button>
        </motion.form>
      </motion.section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">EduViz</div>
          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Contact</a>
          </div>
          <div className="social-links">
            <a href="#" className="social-icon">FB</a>
            <a href="#" className="social-icon">TW</a>
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">LI</a>
          </div>
          <p>© 2025 EduViz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;