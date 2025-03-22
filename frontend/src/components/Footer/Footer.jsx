import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>EduViz</h3>
          <p className={styles.footerDescription}>
            Revolutionizing education through interactive 3D models and visual
            learning experiences.
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore Models</Link>
            </li>
            <li>
              <Link to="/how-it-works">How It Works</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>For Creators</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/signup?role=creator">Become a Creator</Link>
            </li>
            <li>
              <Link to="/creator-guidelines">Creator Guidelines</Link>
            </li>
            <li>
              <Link to="/creator-faq">Creator FAQ</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>Newsletter</h3>
          <p className={styles.footerDescription}>
            Subscribe to get the latest updates on new models and features.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterButton}>Subscribe</button>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} EduViz. All rights reserved.
        </p>
        <div className={styles.footerLegal}>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;