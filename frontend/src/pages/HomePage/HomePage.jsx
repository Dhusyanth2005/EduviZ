import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scroller } from "react-scroll"; // Import scroller from react-scroll
import Footer from "../../components/Footer/Footer";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import HeroSection from "../../components/HeroSection/HeroSection";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaCubes,
  FaUserGraduate,
  FaStore,
  FaChalkboardTeacher,
} from "react-icons/fa";
import styles from "./HomePage.module.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const homepageRef = useRef(null);
  const headerRef = useRef(null);
  const navLinksRef = useRef([]);
  const authButtonsRef = useRef(null);
  
  // Refs for sections to scroll to
  const featuresRef = useRef(null);
  const categoriesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuredModelsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  
  // State for header styling
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = false;
  
  // Track last scroll position to determine scroll direction
  const lastScrollPositionRef = useRef(0);
  
  // New scroll function using react-scroll
  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80 // Offset for header height
    });
  };

  useEffect(() => {
    // Scroll effect for header
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollPosition > lastScrollPositionRef.current) {
        // Scrolling down
        if (currentScrollPosition > 50) {
          setIsHidden(true);
          setScrolled(true);
          gsap.to(headerRef.current, {
            y: '-100%', // Move header off-screen
            backgroundColor: 'rgba(15, 16, 21, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            duration: 0.3
          });
        }
      } else {
        // Scrolling up
        setIsHidden(false);
        gsap.to(headerRef.current, {
          y: '0%', // Bring header back
          backgroundColor: currentScrollPosition > 50 
            ? 'rgba(15, 16, 21, 0.9)' 
            : 'transparent',
          backdropFilter: currentScrollPosition > 50 ? 'blur(10px)' : 'blur(0px)',
          boxShadow: currentScrollPosition > 50 
            ? '0 4px 6px rgba(0,0,0,0.1)' 
            : 'none',
          duration: 0.3
        });

        // Update scrolled state based on scroll position
        if (currentScrollPosition > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }

      // Set last scroll position
      lastScrollPositionRef.current = currentScrollPosition;
    };
    
    // Initial header animation
    const animateHeader = () => {
      // Animate logo
      gsap.fromTo(
        headerRef.current.querySelector(`.${styles.logo}`),
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );

      // Animate nav links
      gsap.fromTo(
        navLinksRef.current,
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out" 
        }
      );

      // Animate auth buttons
      gsap.fromTo(
        authButtonsRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    };

    // Create section animations
    const setupSectionAnimations = () => {
      // Professional dark theme color palette
      const professionalTheme = {
        background: '#0A0A0F',
        sectionBackground: '#0F1015',
        textPrimary: '#E4E6EB',
        textSecondary: '#8C8E94',
        accent: '#3A7CA5',
        border: 'rgba(255,255,255,0.05)'
      };

      // Global theme application
      gsap.set('body', { 
        backgroundColor: professionalTheme.background,
        color: professionalTheme.textPrimary
      });
      
      // Collect all section refs
      const sectionRefs = [
        featuresRef, 
        categoriesRef, 
        howItWorksRef, 
        featuredModelsRef, 
        testimonialsRef, 
        ctaRef
      ];
      
      // Create animations for each section
      sectionRefs.forEach((sectionRef, index) => {
        if (!sectionRef.current) return;
        
        // Sophisticated section animation
        const sectionAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });

        // Subtle section reveal
        sectionAnimation.fromTo(sectionRef.current, 
          { 
            opacity: 0, 
            y: 30, 
            scale: 0.98,
            backgroundColor: 'transparent',
            borderTop: `1px solid ${professionalTheme.border}`
          }, 
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            backgroundColor: professionalTheme.sectionBackground,
            borderTop: `1px solid ${professionalTheme.accent}`,
            duration: 0.8,
            ease: "power2.out"
          }
        );

        // Animate section children with refined approach
        const children = sectionRef.current.querySelectorAll(
          `.${styles.sectionHeader}, 
          .${styles.featuresGrid} > *, 
          .${styles.categoriesGrid} > *, 
          .${styles.stepsContainer} > *, 
          .${styles.modelsGrid} > *, 
          .${styles.testimonialsGrid} > *, 
          .${styles.ctaContent} > *`
        );

        sectionAnimation.fromTo(
          children,
          { 
            opacity: 0, 
            y: 40, 
            rotationX: -10,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            filter: 'blur(0px)',
            color: professionalTheme.textPrimary,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out"
          },
          0.3
        );

        // Subtle hover and interaction effects
        const interactiveElements = sectionRef.current.querySelectorAll(
          `a, .${styles.btnPrimary}, .${styles.btnSecondary}, 
          .${styles.featureCard}, .${styles.categoryCard}, 
          .${styles.modelCard}`
        );

        // Add hover effects
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', () => {
            gsap.to(el, {
              scale: 1.02,
              boxShadow: `0 10px 20px rgba(58, 124, 165, 0.1)`,
              duration: 0.3,
              ease: "power1.out"
            });
          });

          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              scale: 1,
              boxShadow: 'none',
              duration: 0.3,
              ease: "power1.out"
            });
          });
        });
      });
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    
    // Run initial animations
    animateHeader();
    setupSectionAnimations();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Dropdown animation
  useEffect(() => {
    if (dropdownOpen) {
      gsap.fromTo(
        `.${styles.dropdown}`,
        { opacity: 0, y: -20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.3, 
          ease: "power2.out" 
        }
      );
    }
  }, [dropdownOpen]);

  return (
    <div className={styles.homepage} ref={homepageRef}>
      {/* Integrated Header */}
      <header 
        ref={headerRef} 
        className={`${styles.headerWrapper} 
          ${scrolled ? styles.scrolled : ""} 
          ${isHidden ? styles.hidden : ""}`}
      >
        <Link to="/">
          <div className={styles.logo}>EduViz</div>
        </Link>

        <nav className={styles.navLinks}>
          {[
            { label: "Home", onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
            { label: "Features", onClick: () => scrollToSection("features-section") },
            { label: "Categories", onClick: () => scrollToSection("categories-section") },
            { label: "How It Works", onClick: () => scrollToSection("how-it-works-section") },
            { label: "Models", onClick: () => scrollToSection("featured-models-section") }
          ].map((link, index) => (
            <div 
              key={link.label} 
              ref={el => navLinksRef.current[index] = el}
              className={styles.navLinkItem}
            >
              <button 
                onClick={link.onClick}
                className={styles.navButton}
                onMouseEnter={(e) => {
                  gsap.to(e.target, {
                    color: '#3A7CA5', // Accent color on hover
                    scale: 1.05,
                    duration: 0.2
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, {
                    color: 'inherit',
                    scale: 1,
                    duration: 0.2
                  });
                }}
              >
                {link.label}
              </button>
            </div>
          ))}
        </nav>

        {isLoggedIn ? (
          <div className={styles.profileSection}>
            <div
              className={styles.profileIcon}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              👤
            </div>
            {dropdownOpen && (
              <div className={styles.dropdown}>
                {[
                  { to: "/dashboard", label: "Dashboard" },
                  { to: "/settings", label: "Settings" },
                  { to: "/logout", label: "Logout" }
                ].map((item) => (
                  <div key={item.to} className={styles.dropdownItem}>
                    <Link to={item.to}>{item.label}</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div 
            ref={authButtonsRef} 
            className={styles.authButtons}
          >
            <Link to="/login">
              <button 
                className={styles.button}
                onMouseEnter={(e) => {
                  gsap.to(e.target, {
                    backgroundColor: 'rgba(58, 124, 165, 0.1)',
                    scale: 1.05,
                    duration: 0.2
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, {
                    backgroundColor: 'transparent',
                    scale: 1,
                    duration: 0.2
                  });
                }}
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button 
                className={`${styles.button} ${styles.primary}`}
                onMouseEnter={(e) => {
                  gsap.to(e.target, {
                    backgroundColor: '#3A7CA5',
                    scale: 1.05,
                    duration: 0.2
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, {
                    backgroundColor: 'inherit',
                    scale: 1,
                    duration: 0.2
                  });
                }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </header>

      <HeroSection />

      {/* Updated Features Section */}
      <FeatureSection />

      <section 
        id="categories-section" // Added id for react-scroll
        className={styles.categoriesSection} 
        ref={categoriesRef}
      >
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

      <section 
        id="how-it-works-section" // Added id for react-scroll
        className={styles.howItWorksSection} 
        ref={howItWorksRef}
      >
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

      <section 
        id="featured-models-section" // Added id for react-scroll
        className={styles.featuredModelsSection} 
        ref={featuredModelsRef}
      >
        <div className={styles.heroBackground}>
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
          <div className={`${styles.shape} ${styles.shape4}`}></div>
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Models</h2>
            <p className={styles.sectionSubtitle}>
              Top-rated and popular 3D learning resources
            </p>
          </div>
          <div className={styles.modelsGrid}>
            <div className={styles.modelCard}>
              <div className={`${styles.modelImage} ${styles.model1Bg}`}></div>
              <div className={styles.modelContent}>
                <h3 className={styles.modelTitle}>Human Heart Anatomy</h3>
                <p className={styles.modelCategory}>Medical</p>
                <div className={styles.modelStats}>
                  <span className={styles.modelRating}>4.9 ★</span>
                  <span className={styles.modelPrice}>$12.99</span>
                </div>
                <Link to="/model/human-heart" className={styles.btnModel}>
                  View Model
                </Link>
              </div>
            </div>
            <div className={styles.modelCard}>
              <div className={`${styles.modelImage} ${styles.model2Bg}`}></div>
              <div className={styles.modelContent}>
                <h3 className={styles.modelTitle}>Electric Motor Components</h3>
                <p className={styles.modelCategory}>Engineering</p>
                <div className={styles.modelStats}>
                  <span className={styles.modelRating}>4.8 ★</span>
                  <span className={styles.modelPrice}>$9.99</span>
                </div>
                <Link to="/model/electric-motor" className={styles.btnModel}>
                  View Model
                </Link>
              </div>
            </div>
            <div className={styles.modelCard}>
              <div className={`${styles.modelImage} ${styles.model3Bg}`}></div>
              <div className={styles.modelContent}>
                <h3 className={styles.modelTitle}>Solar System</h3>
                <p className={styles.modelCategory}>Science</p>
                <div className={styles.modelStats}>
                  <span className={styles.modelRating}>4.7 ★</span>
                  <span className={styles.modelPrice}>$7.99</span>
                </div>
                <Link to="/model/solar-system" className={styles.btnModel}>
                  View Model
                </Link>
              </div>
            </div>
            <div className={styles.modelCard}>
              <div className={`${styles.modelImage} ${styles.model4Bg}`}></div>
              <div className={styles.modelContent}>
                <h3 className={styles.modelTitle}>Sustainable House Design</h3>
                <p className={styles.modelCategory}>Architecture</p>
                <div className={styles.modelStats}>
                  <span className={styles.modelRating}>4.8 ★</span>
                  <span className={styles.modelPrice}>$14.99</span>
                </div>
                <Link to="/model/sustainable-house" className={styles.btnModel}>
                  View Model
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.modelsCta}>
            <Link to="/models" className={styles.btnPrimary}>
              Explore All Models
            </Link>
          </div>
        </div>
      </section>

      <section 
        id="testimonials-section" // Added id for react-scroll
        className={styles.testimonialsSection} 
        ref={testimonialsRef}
      >
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
                  "I've earned over $10,000 selling my architectural 3D models on EduViz."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={`${styles.authorAvatar} ${styles.creatorAvatar}`}></div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>Miguel Torres</h4>
                  <p className={styles.authorTitle}>3D Content Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="cta-section" // Added id for react-scroll
        className={styles.ctaSection} 
        ref={ctaRef}
      >
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Learning Experience?</h2>
            <p className={styles.ctaText}>
              Join thousands of students, educators, and creators on EduViz today
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/signup" className={styles.btnPrimary}>Get Started for Free</Link>
              <Link to="/creators" className={styles.btnSecondary}>Learn About Creating</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;