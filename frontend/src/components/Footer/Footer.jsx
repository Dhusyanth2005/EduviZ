import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";
import worldIcon from "../../assets/world-icon.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const footerRef = useRef(null);
  const sectionRefs = useRef([]);
  const bottomRef = useRef(null);
  const languageButtonRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' }
  ];

  const translations = {
    en: {
      quickLinks: 'Quick Links',
      home: 'Home',
      exploreModels: 'Explore Models',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      contactUs: 'Contact Us',
      forCreators: 'For Creators',
      becomeCreator: 'Become a Creator',
      creatorGuidelines: 'Creator Guidelines',
      creatorFAQ: 'Creator FAQ',
      resources: 'Resources',
      newsletter: 'Newsletter',
      subscribeText: 'Subscribe to get the latest updates on new models and features.',
      emailPlaceholder: 'Your email address',
      subscribe: 'Subscribe',
      allRightsReserved: 'All rights reserved.',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy'
    },
    ta: {
      quickLinks: 'விரைவு இணைப்புகள்',
      home: 'முகப்பு',
      exploreModels: 'மாதிரிகளை ஆராயுங்கள்',
      howItWorks: 'இது எப்படி செயல்படுகிறது',
      pricing: 'விலை',
      contactUs: 'எங்களை தொடர்பு கொள்ள',
      forCreators: 'படைப்பாளர்களுக்கு',
      becomeCreator: 'படைப்பாளராகுங்கள்',
      creatorGuidelines: 'படைப்பாளர் வழிகாட்டுதல்கள்',
      creatorFAQ: 'படைப்பாளர் கேள்விகள்',
      resources: 'வளங்கள்',
      newsletter: 'செய்திமடல்',
      subscribeText: 'புதிய மாதிரிகள் மற்றும் அம்சங்கள் பற்றிய சமீபத்திய புதுப்பிப்புகளைப் பெற குழுசேரவும்.',
      emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரி',
      subscribe: 'குழுசேர்',
      allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      termsOfService: 'சேவை விதிமுறைகள்',
      privacyPolicy: 'தனியுரிமைக் கொள்கை'
    },
    hi: {
      quickLinks: 'त्वरित लिंक',
      home: 'होम',
      exploreModels: 'मॉडल एक्सप्लोर करें',
      howItWorks: 'यह कैसे काम करता है',
      pricing: 'मूल्य निर्धारण',
      contactUs: 'संपर्क करें',
      forCreators: 'निर्माताओं के लिए',
      becomeCreator: 'निर्माता बनें',
      creatorGuidelines: 'निर्माता दिशानिर्देश',
      creatorFAQ: 'निर्माता FAQ',
      resources: 'संसाधन',
      newsletter: 'न्यूज़लेटर',
      subscribeText: 'नए मॉडल और सुविधाओं के बारे में नवीनतम अपडेट प्राप्त करने के लिए सदस्यता लें।',
      emailPlaceholder: 'आपका ईमेल पता',
      subscribe: 'सदस्यता लें',
      allRightsReserved: 'सर्वाधिकार सुरक्षित।',
      termsOfService: 'सेवा की शर्तें',
      privacyPolicy: 'गोपनीयता नीति'
    },
    de: {
      quickLinks: 'Schnelllinks',
      home: 'Startseite',
      exploreModels: 'Modelle erkunden',
      howItWorks: 'Wie es funktioniert',
      pricing: 'Preise',
      contactUs: 'Kontakt',
      forCreators: 'Für Ersteller',
      becomeCreator: 'Ersteller werden',
      creatorGuidelines: 'Ersteller-Richtlinien',
      creatorFAQ: 'Ersteller-FAQ',
      resources: 'Ressourcen',
      newsletter: 'Newsletter',
      subscribeText: 'Abonnieren Sie, um die neuesten Updates zu neuen Modellen und Funktionen zu erhalten.',
      emailPlaceholder: 'Ihre E-Mail-Adresse',
      subscribe: 'Abonnieren',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      termsOfService: 'Nutzungsbedingungen',
      privacyPolicy: 'Datenschutzrichtlinie'
    },
    ja: {
      quickLinks: 'クイックリンク',
      home: 'ホーム',
      exploreModels: 'モデルを探索',
      howItWorks: '使い方',
      pricing: '料金',
      contactUs: 'お問い合わせ',
      forCreators: 'クリエイター向け',
      becomeCreator: 'クリエイターになる',
      creatorGuidelines: 'クリエイターガイドライン',
      creatorFAQ: 'クリエイターFAQ',
      resources: 'リソース',
      newsletter: 'ニュースレター',
      subscribeText: '新しいモデルや機能に関する最新情報を受け取るには、購読してください。',
      emailPlaceholder: 'メールアドレス',
      subscribe: '購読',
      allRightsReserved: '全著作権所有。',
      termsOfService: '利用規約',
      privacyPolicy: 'プライバシーポリシー'
    }
  };

  const t = (key) => translations[selectedLanguage][key];

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setShowLanguageModal(false);
    localStorage.setItem('preferredLanguage', lang);
    
    // Dispatch custom event for same-window language changes
    const event = new Event('localStorageChange');
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageButtonRef.current && !languageButtonRef.current.contains(event.target)) {
        setShowLanguageModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;

    const sections = sectionRefs.current;
    sections.forEach((section) => {
      if (section) {
        gsap.set(section, { opacity: 0, y: 30 });
        Array.from(section.children).forEach(child => {
          gsap.set(child, { opacity: 0, y: 20 });
        });
      }
    });

    sections.forEach((section, index) => {
      if (section) {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          ease: "power3.out"
        });

        gsap.to(section.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          ease: "power3.out"
        });
      }
    });

    if (bottomRef.current) {
      gsap.to(bottomRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        ease: "power3.out"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer className={styles.footerWrapper} ref={footerRef}>
      <div className={styles.footerContent}>
        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <h3 className={styles.footerHeading}>EduViz</h3>
          <p className={styles.footerDescription}>
            {t('subscribeText')}
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[1] = el)}
        >
          <h3 className={styles.footerHeading}>{t('quickLinks')}</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/">{t('home')}</Link>
            </li>
            <li>
              <Link to="/explore">{t('exploreModels')}</Link>
            </li>
            <li>
              <Link to="/how-it-works">{t('howItWorks')}</Link>
            </li>
            <li>
              <Link to="/pricing">{t('pricing')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('contactUs')}</Link>
            </li>
          </ul>
        </div>

        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          <h3 className={styles.footerHeading}>{t('forCreators')}</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/signup?role=creator">{t('becomeCreator')}</Link>
            </li>
            <li>
              <Link to="/creator-guidelines">{t('creatorGuidelines')}</Link>
            </li>
            <li>
              <Link to="/creator-faq">{t('creatorFAQ')}</Link>
            </li>
            <li>
              <Link to="/resources">{t('resources')}</Link>
            </li>
          </ul>
        </div>

        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[3] = el)}
        >
          <h3 className={styles.footerHeading}>{t('newsletter')}</h3>
          <p className={styles.footerDescription}>
            {t('subscribeText')}
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterButton}>{t('subscribe')}</button>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom} ref={bottomRef}>
        <div className={styles.footerBottomContent}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} EduViz. {t('allRightsReserved')}
          </p>
          <div className={styles.footerLegal}>
            <Link to="/terms">{t('termsOfService')}</Link>
            <Link to="/privacy">{t('privacyPolicy')}</Link>
          </div>
          <div className={styles.languageSelector} ref={languageButtonRef}>
            <button 
              className={styles.languageButton} 
              onClick={() => setShowLanguageModal(!showLanguageModal)}
              aria-label="Select language"
            >
              <img src={worldIcon} alt="" className={styles.worldIcon} aria-hidden="true" />
              <span className={styles.currentLanguage}>
                {languages.find(lang => lang.code === selectedLanguage)?.name || 'English'}
              </span>
            </button>
            {showLanguageModal && (
              <div className={styles.languageModal}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`${styles.languageOption} ${selectedLanguage === lang.code ? styles.active : ''}`}
                    onClick={() => handleLanguageSelect(lang.code)}
                    aria-current={selectedLanguage === lang.code}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;