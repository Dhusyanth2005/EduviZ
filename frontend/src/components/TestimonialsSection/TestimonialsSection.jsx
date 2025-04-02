// components/TestimonialsSection/TestimonialsSection.jsx
import React, { useRef, useEffect } from 'react';

import styles from '../../pages/HomePage/HomePage.module.css';

const TestimonialsSection = () => {

  return (
    <section id="testimonials-section" className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Our Users Say</h2>
          <p className={styles.sectionSubtitle}>
            Hear from students, educators, and creators in our community
          </p>
        </div>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "As a medical student, the interactive anatomy models have revolutionized how I study complex systems."
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={`${styles.authorAvatar} ${styles.studentAvatar}`}></div>
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>Sarah Johnson</h4>
                <p className={styles.authorTitle}>Medical Student</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "My engineering students grasp mechanical concepts much faster with EduViz's 3D models."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={`${styles.authorAvatar} ${styles.teacherAvatar}`}></div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>Dr. Robert Chen</h4>
                  <p className={styles.authorTitle}>Engineering Professor</p>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "My engineering students grasp mechanical concepts much faster with EduViz's 3D models."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={`${styles.authorAvatar} ${styles.teacherAvatar}`}></div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>Dr. Robert Chen</h4>
                  <p className={styles.authorTitle}>Engineering Professor</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;