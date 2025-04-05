// components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './Header.module.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const translations = {
    en: {
      home: "Home",
      features: "Features",
      categories: "Categories",
      howItWorks: "How It Works",
      models: "Models",
      login: "Login",
      signUp: "Sign Up"
    },
    ta: {
      home: "முகப்பு",
      features: "அம்சங்கள்",
      categories: "வகைகள்",
      howItWorks: "எப்படி வேலை செய்கிறது",
      models: "மாதிரிகள்",
      login: "உள்நுழை",
      signUp: "பதிவு செய்க"
    },
    hi: {
      home: "होम",
      features: "विशेषताएं",
      categories: "श्रेणियां",
      howItWorks: "यह कैसे काम करता है",
      models: "मॉडल",
      login: "लॉग इन",
      signUp: "साइन अप"
    },
    de: {
      home: "Startseite",
      features: "Funktionen",
      categories: "Kategorien",
      howItWorks: "So funktioniert's",
      models: "Modelle",
      login: "Anmelden",
      signUp: "Registrieren"
    },
    ja: {
      home: "ホーム",
      features: "機能",
      categories: "カテゴリー",
      howItWorks: "使い方",
      models: "モデル",
      login: "ログイン",
      signUp: "サインアップ"
    }
  };

  const t = (key) => {
    return translations[selectedLanguage][key] || translations['en'][key];
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    const handleLanguageChange = (e) => {
      if (e.key === 'preferredLanguage') {
        setSelectedLanguage(e.newValue || 'en');
      }
    };

    window.addEventListener('storage', handleLanguageChange);
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const handleLocalLanguageChange = () => {
      const currentLanguage = localStorage.getItem('preferredLanguage');
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    };

    window.addEventListener('localStorageChange', handleLocalLanguageChange);
    return () => {
      window.removeEventListener('localStorageChange', handleLocalLanguageChange);
    };
  }, [selectedLanguage]);

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
          <div  className={styles.logoShape}></div>
          EduViz
        </Link>
        <div className={styles.navLinks}>
          <button onClick={() => scrollToSection('hero-section')} className={styles.navLink}>{t('home')}</button>
          <button onClick={() => scrollToSection('features-section')} className={styles.navLink}>{t('features')}</button>
          <button onClick={() => scrollToSection('categories-section')} className={styles.navLink}>{t('categories')}</button>
          <button onClick={() => scrollToSection('how-it-works-section')} className={styles.navLink}>{t('howItWorks')}</button>
          <button onClick={() => scrollToSection('featured-models-section')} className={styles.navLink}>{t('models')}</button>
        </div>
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.button}>{t('login')}</button>
          </Link>
          <Link to="/signup">
            <button className={`${styles.button} ${styles.primary}`}>{t('signUp')}</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;