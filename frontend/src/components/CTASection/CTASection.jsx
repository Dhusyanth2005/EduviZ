// components/CTASection/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../pages/HomePage/HomePage.module.css'; // Use the component-specific CSS

const CTASection = () => {
  return (
    <section id="cta-section" className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Learning Experience?</h2>
          <p className={styles.ctaText}>
            Join thousands of students, educators, and creators on EduViz today
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/signup" className={styles.btnPrimary}>Get Started for Free</Link>
            <Link to="/creators" className={styles.btnSecondary}>Learn About Creating</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;