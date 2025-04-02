// components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './Header.module.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    console.log(`Attempting to scroll to: ${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      console.log(`Element found: ${element.id}, offsetTop: ${element.offsetTop}`);
      const headerHeight = document.querySelector(`.${styles.header}`)?.offsetHeight || 0;
      const offsetPosition = element.offsetTop - headerHeight;
      console.log(`Scrolling to: ${offsetPosition}`);

      // Use scrollIntoView as a fallback
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error(`Element with ID ${sectionId} not found`);
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoShape}></div>
          EduViz
        </Link>
        <div className={styles.navLinks}>
          <button onClick={() => scrollToSection('hero-section')} className={styles.navLink}>Home</button>
          <button onClick={() => scrollToSection('features-section')} className={styles.navLink}>Features</button>
          <button onClick={() => scrollToSection('categories-section')} className={styles.navLink}>Categories</button>
          <button onClick={() => scrollToSection('how-it-works-section')} className={styles.navLink}>How It Works</button>
          <button onClick={() => scrollToSection('featured-models-section')} className={styles.navLink}>Models</button>
        </div>
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.button}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={`${styles.button} ${styles.primary}`}>Sign Up</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;