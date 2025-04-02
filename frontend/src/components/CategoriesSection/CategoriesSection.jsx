// components/CategoriesSection/CategoriesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../pages/HomePage/HomePage.module.css'; // Use the component-specific CSS

const CategoriesSection = () => {
  return (
    <section id="categories-section" className={styles.categoriesSection}>
      <div className={styles.heroBackground}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
        <div className={styles.heroOverlay}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Categories</h2>
          <p className={styles.sectionSubtitle}>
            Discover 3D models across multiple disciplines and subjects
          </p>
        </div>
        <div className={styles.categoriesGrid}>
          <Link to="/category/engineering" className={styles.categoryCard}>
            <div className={`${styles.categoryImage} ${styles.engineeringBg}`}></div>
            <h3 className={styles.categoryTitle}>Engineering</h3>
            <p className={styles.categoryCount}>240+ Models</p>
          </Link>
          <Link to="/category/medical" className={styles.categoryCard}>
            <div className={`${styles.categoryImage} ${styles.medicalBg}`}></div>
            <h3 className={styles.categoryTitle}>Medical</h3>
            <p className={styles.categoryCount}>180+ Models</p>
          </Link>
          <Link to="/category/architecture" className={styles.categoryCard}>
            <div className={`${styles.categoryImage} ${styles.architectureBg}`}></div>
            <h3 className={styles.categoryTitle}>Architecture</h3>
            <p className={styles.categoryCount}>150+ Models</p>
          </Link>
          <Link to="/category/science" className={styles.categoryCard}>
            <div className={`${styles.categoryImage} ${styles.scienceBg}`}></div>
            <h3 className={styles.categoryTitle}>Science</h3>
            <p className={styles.categoryCount}>320+ Models</p>
          </Link>
        </div>
        <div className={styles.categoriesCta}>
          <Link to="/categories" className={styles.btnSecondary}>
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;