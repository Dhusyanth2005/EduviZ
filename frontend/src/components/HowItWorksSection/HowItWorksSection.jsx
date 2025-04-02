// components/HowItWorksSection/HowItWorksSection.jsx
import React from 'react';
import { FaUserGraduate, FaStore, FaChalkboardTeacher } from 'react-icons/fa';
import styles from '../../pages/HomePage/HomePage.module.css'; // Use the component-specific CSS

const HowItWorksSection = () => {
  return (
    <section id="how-it-works-section" className={styles.howItWorksSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>
            Join our community as a learner or creator in three simple steps
          </p>
        </div>
        <div className={styles.stepsContainer}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepIcon}><FaUserGraduate /></div>
            <h3 className={styles.stepTitle}>Create an Account</h3>
            <p className={styles.stepDescription}>
              Sign up for free as a learner or creator and set up your profile
            </p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepIcon}><FaStore /></div>
            <h3 className={styles.stepTitle}>Browse or Upload</h3>
            <p className={styles.stepDescription}>
              Discover models as a learner or upload your creations as a creator
            </p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepIcon}><FaChalkboardTeacher /></div>
            <h3 className={styles.stepTitle}>Learn or Earn</h3>
            <p className={styles.stepDescription}>
              Interact with models to learn or earn money by selling your creations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;