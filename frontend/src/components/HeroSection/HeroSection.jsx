import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroBackground}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>Revolutionary Learning Platform</span>
        <h1 className={styles.heroHeadline}>
          Learn Visually with Interactive 3D Models
        </h1>
        <p className={styles.heroSubtext}>
          EduViz is a marketplace for interactive 3D learning models. Explore,
          learn, and create like never before!
        </p>
        <div className={styles.heroFeatures}>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Explore 1000+ 3D Models</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Interactive Learning</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Sell Your Creations</span>
          </div>
        </div>
        <div className={styles.heroCta}>
          <Link to="/explore">
            <button className={styles.ctaButton}>Explore Models</button>
          </Link>
          <Link to="/signup?role=creator">
            <button className={`${styles.ctaButton} ${styles.primary}`}>
              Become a Creator
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;