// components/TestimonialsSection/TestimonialsSection.jsx
import React, { useRef, useEffect, useState } from 'react';

import styles from '../../pages/HomePage/HomePage.module.css';

const TestimonialsSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const translations = {
    en: {
      title: "What Our Users Say",
      subtitle: "Hear from students, educators, and creators in our community",
      testimonials: [
        {
          text: "As a medical student, the interactive anatomy models have revolutionized how I study complex systems.",
          name: "Sarah Johnson",
          title: "Medical Student"
        },
        {
          text: "My engineering students grasp mechanical concepts much faster with EduViz's 3D models.",
          name: "Dr. Robert Chen",
          title: "Engineering Professor"
        },
        {
          text: "My engineering students grasp mechanical concepts much faster with EduViz's 3D models.",
          name: "Dr. Robert Chen",
          title: "Engineering Professor"
        }
      ]
    },
    ta: {
      title: "எங்கள் பயனர்கள் என்ன சொல்கிறார்கள்",
      subtitle: "எங்கள் சமூகத்தில் உள்ள மாணவர்கள், கல்வியாளர்கள் மற்றும் படைப்பாளர்களிடமிருந்து கேளுங்கள்",
      testimonials: [
        {
          text: "ஒரு மருத்துவ மாணவராக, ஊடாடும் உடற்கூறியல் மாதிரிகள் சிக்கலான அமைப்புகளை நான் படிக்கும் விதத்தை புரட்சிகரமாக மாற்றியுள்ளன.",
          name: "சாரா ஜான்சன்",
          title: "மருத்துவ மாணவர்"
        },
        {
          text: "என் பொறியியல் மாணவர்கள் EduViz இன் 3D மாதிரிகளுடன் இயந்திர கருத்துக்களை மிக வேகமாக புரிந்துகொள்கிறார்கள்.",
          name: "டாக்டர் ராபர்ட் சென்",
          title: "பொறியியல் பேராசிரியர்"
        },
        {
          text: "என் பொறியியல் மாணவர்கள் EduViz இன் 3D மாதிரிகளுடன் இயந்திர கருத்துக்களை மிக வேகமாக புரிந்துகொள்கிறார்கள்.",
          name: "டாக்டர் ராபர்ட் சென்",
          title: "பொறியியல் பேராசிரியர்"
        }
      ]
    },
    hi: {
      title: "हमारे उपयोगकर्ता क्या कहते हैं",
      subtitle: "हमारे समुदाय के छात्रों, शिक्षकों और रचनाकारों से सुनें",
      testimonials: [
        {
          text: "एक मेडिकल छात्र के रूप में, इंटरैक्टिव एनाटॉमी मॉडल ने जटिल सिस्टम को पढ़ने के मेरे तरीके को क्रांतिकारी बना दिया है।",
          name: "सारा जॉनसन",
          title: "मेडिकल छात्र"
        },
        {
          text: "मेरे इंजीनियरिंग छात्र EduViz के 3D मॉडल के साथ मैकेनिकल कॉन्सेप्ट्स को बहुत तेजी से समझ लेते हैं।",
          name: "डॉ. रॉबर्ट चेन",
          title: "इंजीनियरिंग प्रोफेसर"
        },
        {
          text: "मेरे इंजीनियरिंग छात्र EduViz के 3D मॉडल के साथ मैकेनिकल कॉन्सेप्ट्स को बहुत तेजी से समझ लेते हैं।",
          name: "डॉ. रॉबर्ट चेन",
          title: "इंजीनियरिंग प्रोफेसर"
        }
      ]
    },
    de: {
      title: "Was unsere Nutzer sagen",
      subtitle: "Hören Sie von Studenten, Pädagogen und Entwicklern in unserer Community",
      testimonials: [
        {
          text: "Als Medizinstudent haben die interaktiven Anatomiemodelle meine Art, komplexe Systeme zu studieren, revolutioniert.",
          name: "Sarah Johnson",
          title: "Medizinstudentin"
        },
        {
          text: "Meine Ingenieurstudenten verstehen mechanische Konzepte viel schneller mit den 3D-Modellen von EduViz.",
          name: "Dr. Robert Chen",
          title: "Professor für Ingenieurwesen"
        },
        {
          text: "Meine Ingenieurstudenten verstehen mechanische Konzepte viel schneller mit den 3D-Modellen von EduViz.",
          name: "Dr. Robert Chen",
          title: "Professor für Ingenieurwesen"
        }
      ]
    },
    ja: {
      title: "ユーザーの声",
      subtitle: "コミュニティの学生、教育者、クリエイターの声をお聞きください",
      testimonials: [
        {
          text: "医学生として、インタラクティブな解剖学モデルは複雑なシステムを学ぶ方法を革新的に変えました。",
          name: "サラ・ジョンソン",
          title: "医学生"
        },
        {
          text: "私の工学部の学生たちは、EduVizの3Dモデルを使用することで、機械的な概念をより速く理解できるようになりました。",
          name: "ロバート・チェン博士",
          title: "工学部教授"
        },
        {
          text: "私の工学部の学生たちは、EduVizの3Dモデルを使用することで、機械的な概念をより速く理解できるようになりました。",
          name: "ロバート・チェン博士",
          title: "工学部教授"
        }
      ]
    }
  };

  const t = (key, index) => {
    if (index !== undefined && key === 'testimonials') {
      return translations[selectedLanguage][key][index];
    }
    return translations[selectedLanguage][key];
  };

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
    <section id="testimonials-section" className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
        </div>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "{t('testimonials', 0).text}"
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={`${styles.authorAvatar} ${styles.studentAvatar}`}></div>
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>{t('testimonials', 0).name}</h4>
                <p className={styles.authorTitle}>{t('testimonials', 0).title}</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "{t('testimonials', 1).text}"
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={`${styles.authorAvatar} ${styles.teacherAvatar}`}></div>
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>{t('testimonials', 1).name}</h4>
                <p className={styles.authorTitle}>{t('testimonials', 1).title}</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>
                "{t('testimonials', 2).text}"
              </p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={`${styles.authorAvatar} ${styles.teacherAvatar}`}></div>
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>{t('testimonials', 2).name}</h4>
                <p className={styles.authorTitle}>{t('testimonials', 2).title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;