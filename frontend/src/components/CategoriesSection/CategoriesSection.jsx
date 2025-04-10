import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../pages/HomePage/HomePage.module.css';

const CategoriesSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const categories = [
    {
      id: 1,
      name: "Medical",
      description: "Explore medical courses and resources",
      image: "https://cdn.pixabay.com/photo/2016/11/09/15/27/dna-1811955_1280.jpg"
    },
    {
      id: 2,
      name: "Engineering",
      description: "Engineering courses and tutorials",
      image: "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg"
    },
    {
      id: 3,
      name: "Science",
      description: "Scientific studies and research",
      image: "https://cdn.pixabay.com/photo/2016/11/18/19/01/paris-1836415_1280.jpg"
    },
    {
      id: 4,
      name: "Architecture",
      description: "Architectural design and planning",
      image: "https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_1280.jpg"
    }
  ];

 const translations = {
    en: {
      title: "Explore Categories",
      subtitle: "Discover 3D models across multiple disciplines and subjects",
      viewAll: "View All Categories"
    },
    ta: {
      title: "வகைகளை ஆராயுங்கள்",
      subtitle: "பல்வேறு துறைகள் மற்றும் பாடங்களில் 3D மாதிரிகளைக் கண்டறியவும்",
      viewAll: "அனைத்து வகைகளையும் காண்க"
    },
    hi: {
      title: "श्रेणियों का अन्वेषण करें",
      subtitle: "कई विषयों और विषयों में 3D मॉडल की खोज करें",
      viewAll: "सभी श्रेणियां देखें"
    },
    de: {
      title: "Kategorien erkunden",
      subtitle: "Entdecken Sie 3D-Modelle in verschiedenen Disziplinen und Fächern",
      viewAll: "Alle Kategorien anzeigen"
    },
    ja: {
      title: "カテゴリーを探索",
      subtitle: "様々な分野や科目の3Dモデルを発見",
      viewAll: "すべてのカテゴリーを表示"
    }
  };

  const t = (key) => translations[selectedLanguage][key] || translations['en'][key];

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
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
        </div>
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className={styles.categoryCard}
            >
              <div
                className={styles.categoryImage}
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <p className={styles.categoryDescription}>{category.description}</p>
            </Link>
          ))}
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