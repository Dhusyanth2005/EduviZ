// components/FeaturedModelsSection/FeaturedModelsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../pages/HomePage/HomePage.module.css'; // Use the component-specific CSS

const FeaturedModelsSection = () => {
  return (
    <section id="featured-models-section" className={styles.featuredModelsSection}>
      <div className={styles.heroBackground}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
        <div className={styles.heroOverlay}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Models</h2>
          <p className={styles.sectionSubtitle}>
            Top-rated and popular 3D learning resources
          </p>
        </div>
        <div className={styles.modelsGrid}>
          <div className={styles.modelCard}>
            <div className={`${styles.modelImage} ${styles.model1Bg}`}></div>
            <div className={styles.modelContent}>
              <h3 className={styles.modelTitle}>Human Heart Anatomy</h3>
              <p className={styles.modelCategory}>Medical</p>
              <div className={styles.modelStats}>
                <span className={styles.modelRating}>4.9 ★</span>
                <span className={styles.modelPrice}>$12.99</span>
              </div>
              <Link to="/model/human-heart" className={styles.btnModel}>
                View Model
              </Link>
            </div>
          </div>
          <div className={styles.modelCard}>
            <div className={`${styles.modelImage} ${styles.model2Bg}`}></div>
            <div className={styles.modelContent}>
              <h3 className={styles.modelTitle}>Electric Motor Components</h3>
              <p className={styles.modelCategory}>Engineering</p>
              <div className={styles.modelStats}>
                <span className={styles.modelRating}>4.8 ★</span>
                <span className={styles.modelPrice}>$9.99</span>
              </div>
              <Link to="/model/electric-motor" className={styles.btnModel}>
                View Model
              </Link>
            </div>
          </div>
          <div className={styles.modelCard}>
            <div className={`${styles.modelImage} ${styles.model3Bg}`}></div>
            <div className={styles.modelContent}>
              <h3 className={styles.modelTitle}>Solar System</h3>
              <p className={styles.modelCategory}>Science</p>
              <div className={styles.modelStats}>
                <span className={styles.modelRating}>4.7 ★</span>
                <span className={styles.modelPrice}>$7.99</span>
              </div>
              <Link to="/model/solar-system" className={styles.btnModel}>
                View Model
              </Link>
            </div>
          </div>
          <div className={styles.modelCard}>
            <div className={`${styles.modelImage} ${styles.model4Bg}`}></div>
            <div className={styles.modelContent}>
              <h3 className={styles.modelTitle}>Sustainable House Design</h3>
              <p className={styles.modelCategory}>Architecture</p>
              <div className={styles.modelStats}>
                <span className={styles.modelRating}>4.8 ★</span>
                <span className={styles.modelPrice}>$14.99</span>
              </div>
              <Link to="/model/sustainable-house" className={styles.btnModel}>
                View Model
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.modelsCta}>
          <Link to="/models" className={styles.btnPrimary}>
            Explore All Models
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModelsSection;