// components/CategoriesSection/CategoriesSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../pages/HomePage/HomePage.module.css';

const CategoriesSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const translations = {
    en: {
      title: "Explore Categories",
      subtitle: "Discover 3D models across multiple disciplines and subjects",
      engineering: "Engineering",
      medical: "Medical",
      architecture: "Architecture",
      science: "Science",
      viewAll: "View All Categories"
    },
    ta: {
      title: "வகைகளை ஆராயுங்கள்",
      subtitle: "பல்வேறு துறைகள் மற்றும் பாடங்களில் 3D மாதிரிகளைக் கண்டறியவும்",
      engineering: "பொறியியல்",
      medical: "மருத்துவம்",
      architecture: "கட்டிடக்கலை",
      science: "அறிவியல்",
      viewAll: "அனைத்து வகைகளையும் காண்க"
    },
    hi: {
      title: "श्रेणियों का अन्वेषण करें",
      subtitle: "कई विषयों और विषयों में 3D मॉडल की खोज करें",
      engineering: "इंजीनियरिंग",
      medical: "चिकित्सा",
      architecture: "वास्तुकला",
      science: "विज्ञान",
      viewAll: "सभी श्रेणियां देखें"
    },
    de: {
      title: "Kategorien erkunden",
      subtitle: "Entdecken Sie 3D-Modelle in verschiedenen Disziplinen und Fächern",
      engineering: "Ingenieurwesen",
      medical: "Medizin",
      architecture: "Architektur",
      science: "Wissenschaft",
      viewAll: "Alle Kategorien anzeigen"
    },
    ja: {
      title: "カテゴリーを探索",
      subtitle: "様々な分野や科目の3Dモデルを発見",
      engineering: "エンジニアリング",
      medical: "医療",
      architecture: "建築",
      science: "科学",
      viewAll: "すべてのカテゴリーを表示"
    }
  };

  const t = (key) => translations[selectedLanguage][key];

  useEffect(() => {
    // Load initial language from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    // Listen for language changes from Footer
    const handleLanguageChange = (e) => {
      if (e.key === 'preferredLanguage') {
        setSelectedLanguage(e.newValue || 'en');
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleLanguageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  // Listen for language changes within the same window
  useEffect(() => {
    const handleLocalLanguageChange = () => {
      const currentLanguage = localStorage.getItem('preferredLanguage');
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    };

    // Add event listener for local storage changes
    window.addEventListener('localStorageChange', handleLocalLanguageChange);

    // Cleanup
    return () => {
      window.removeEventListener('localStorageChange', handleLocalLanguageChange);
    };
  }, [selectedLanguage]);

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
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('subtitle')}
          </p>
        </div>
        <div className={styles.categoriesGrid}>
          <Link to="/category/engineering" className={styles.categoryCard}>
            <div className={`${styles.categoryImage} ${styles.engineeringBg}`}></div>
            <h3 className={styles.categoryTitle}>{t('engineering')}</h3>
            <p className={styles.categoryCount}>240+ Models</p>
          </Link>
          <Link to="/category/medical" className={styles.categoryCard}>
            <div className={`${styles.categoryImage} ${styles.medicalBg}`}></div>
            <h3 className={styles.categoryTitle}>{t('medical')}</h3>
            <p className={styles.categoryCount}>180+ Models</p>
          </Link>
          <Link to="/category/architecture" className={styles.categoryCard}>
            <div className={`${styles.categoryImage} ${styles.architectureBg}`}></div>
            <h3 className={styles.categoryTitle}>{t('architecture')}</h3>
            <p className={styles.categoryCount}>150+ Models</p>
          </Link>
          <Link to="/category/science" className={styles.categoryCard}>
            <div className={`${styles.categoryImage} ${styles.scienceBg}`}></div>
            <h3 className={styles.categoryTitle}>{t('science')}</h3>
            <p className={styles.categoryCount}>320+ Models</p>
          </Link>
        </div>
        <div className={styles.categoriesCta}>
          <Link to="/categories" className={styles.btnSecondary}>
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;