// components/FeaturedModelsSection/FeaturedModelsSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../pages/HomePage/HomePage.module.css'; // Use the component-specific CSS

const FeaturedModelsSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const translations = {
    en: {
      title: "Featured Models",
      subtitle: "Top-rated and popular 3D learning resources",
      viewModel: "View Model",
      exploreAll: "Explore All Models",
      models: [
        {
          title: "Human Heart Anatomy",
          category: "Medical"
        },
        {
          title: "Electric Motor Components",
          category: "Engineering"
        },
        {
          title: "Solar System",
          category: "Science"
        },
        {
          title: "Sustainable House Design",
          category: "Architecture"
        }
      ]
    },
    ta: {
      title: "சிறப்பு மாதிரிகள்",
      subtitle: "உயர்-மதிப்பிடப்பட்ட மற்றும் பிரபலமான 3D கற்றல் வளங்கள்",
      viewModel: "மாதிரியைக் காண்க",
      exploreAll: "அனைத்து மாதிரிகளையும் ஆராயுங்கள்",
      models: [
        {
          title: "மனித இதய உடற்கூறியல்",
          category: "மருத்துவம்"
        },
        {
          title: "மின்மோட்டார் கூறுகள்",
          category: "பொறியியல்"
        },
        {
          title: "சூரிய குடும்பம்",
          category: "அறிவியல்"
        },
        {
          title: "நிலையான வீட்டு வடிவமைப்பு",
          category: "கட்டிடக்கலை"
        }
      ]
    },
    hi: {
      title: "विशेष मॉडल",
      subtitle: "उच्च-रेटेड और लोकप्रिय 3D शिक्षण संसाधन",
      viewModel: "मॉडल देखें",
      exploreAll: "सभी मॉडल देखें",
      models: [
        {
          title: "मानव हृदय शरीर रचना",
          category: "चिकित्सा"
        },
        {
          title: "विद्युत मोटर घटक",
          category: "इंजीनियरिंग"
        },
        {
          title: "सौर मंडल",
          category: "विज्ञान"
        },
        {
          title: "स्थायी घर डिजाइन",
          category: "वास्तुकला"
        }
      ]
    },
    de: {
      title: "Ausgewählte Modelle",
      subtitle: "Bestbewertete und beliebte 3D-Lernressourcen",
      viewModel: "Modell ansehen",
      exploreAll: "Alle Modelle erkunden",
      models: [
        {
          title: "Anatomie des menschlichen Herzens",
          category: "Medizin"
        },
        {
          title: "Elektromotor-Komponenten",
          category: "Ingenieurwesen"
        },
        {
          title: "Sonnensystem",
          category: "Wissenschaft"
        },
        {
          title: "Nachhaltiges Hausdesign",
          category: "Architektur"
        }
      ]
    },
    ja: {
      title: "注目のモデル",
      subtitle: "高評価で人気の3D学習リソース",
      viewModel: "モデルを見る",
      exploreAll: "すべてのモデルを見る",
      models: [
        {
          title: "人体心臓の解剖学",
          category: "医学"
        },
        {
          title: "電気モーターの構成部品",
          category: "工学"
        },
        {
          title: "太陽系",
          category: "科学"
        },
        {
          title: "持続可能な住宅設計",
          category: "建築"
        }
      ]
    }
  };

  const t = (key, index) => {
    if (index !== undefined && key === 'models') {
      return translations[selectedLanguage][key][index];
    }
    return translations[selectedLanguage][key];
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
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
        </div>
        <div className={styles.modelsGrid}>
          <div className={styles.modelCard}>
            <div className={`${styles.modelImage} ${styles.model1Bg}`}></div>
            <div className={styles.modelContent}>
              <h3 className={styles.modelTitle}>{t('models', 0).title}</h3>
              <p className={styles.modelCategory}>{t('models', 0).category}</p>
              <div className={styles.modelStats}>
                <span className={styles.modelRating}>4.9 ★</span>
                <span className={styles.modelPrice}>$12.99</span>
              </div>
              <Link to="/model/human-heart" className={styles.btnModel}>
                {t('viewModel')}
              </Link>
            </div>
          </div>
          <div className={styles.modelCard}>
            <div className={`${styles.modelImage} ${styles.model2Bg}`}></div>
            <div className={styles.modelContent}>
              <h3 className={styles.modelTitle}>{t('models', 1).title}</h3>
              <p className={styles.modelCategory}>{t('models', 1).category}</p>
              <div className={styles.modelStats}>
                <span className={styles.modelRating}>4.8 ★</span>
                <span className={styles.modelPrice}>$9.99</span>
              </div>
              <Link to="/model/electric-motor" className={styles.btnModel}>
                {t('viewModel')}
              </Link>
            </div>
          </div>
          <div className={styles.modelCard}>
            <div className={`${styles.modelImage} ${styles.model3Bg}`}></div>
            <div className={styles.modelContent}>
              <h3 className={styles.modelTitle}>{t('models', 2).title}</h3>
              <p className={styles.modelCategory}>{t('models', 2).category}</p>
              <div className={styles.modelStats}>
                <span className={styles.modelRating}>4.7 ★</span>
                <span className={styles.modelPrice}>$7.99</span>
              </div>
              <Link to="/model/solar-system" className={styles.btnModel}>
                {t('viewModel')}
              </Link>
            </div>
          </div>
          <div className={styles.modelCard}>
            <div className={`${styles.modelImage} ${styles.model4Bg}`}></div>
            <div className={styles.modelContent}>
              <h3 className={styles.modelTitle}>{t('models', 3).title}</h3>
              <p className={styles.modelCategory}>{t('models', 3).category}</p>
              <div className={styles.modelStats}>
                <span className={styles.modelRating}>4.8 ★</span>
                <span className={styles.modelPrice}>$14.99</span>
              </div>
              <Link to="/model/sustainable-house" className={styles.btnModel}>
                {t('viewModel')}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.modelsCta}>
          <Link to="/models" className={styles.btnPrimary}>
            {t('exploreAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModelsSection;