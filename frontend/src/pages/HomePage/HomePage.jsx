import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
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
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Performance optimization: Batch animations and reduce DOM queries
    const sections = sectionsRef.current.filter(section => section);

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

    // Create a single ScrollTrigger timeline for better performance
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: homepageRef.current,
        start: "top top",
        end: "bottom bottom",
      }
    });

    sections.forEach((section, index) => {
      // Sophisticated section animation
      const sectionAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      // Subtle section reveal
      sectionAnimation.fromTo(section, 
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
      const children = section.querySelectorAll(
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
      const interactiveElements = section.querySelectorAll(
        `a, .${styles.btnPrimary}, .${styles.btnSecondary}, 
        .${styles.featureCard}, .${styles.categoryCard}, 
        .${styles.modelCard}`
      );

      // Add hover and subtle transition effects
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

    // Cleanup function
    return () => {
      masterTimeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);



  return (
    <div className={styles.homepage} ref={homepageRef}>
      <Header initialScrolled ={true} />
      <HeroSection />

      <section 
        className={styles.featuresSection} 
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How EduViz Works</h2>
            <p className={styles.sectionSubtitle}>
              Our platform makes 3D learning accessible and engaging for everyone
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><FaCubes /></div>
              <h3 className={styles.featureTitle}>Diverse 3D Models</h3>
              <p className={styles.featureDescription}>
                Explore thousands of interactive 3D models across engineering, medical, architectural, and educational categories.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><FaLaptopCode /></div>
              <h3 className={styles.featureTitle}>WebGL Technology</h3>
              <p className={styles.featureDescription}>
                Powered by Three.js for smooth and responsive 3D rendering directly in your browser without additional plugins.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><FaGraduationCap /></div>
              <h3 className={styles.featureTitle}>Interactive Learning</h3>
              <p className={styles.featureDescription}>
                Rotate, zoom, dissect, and interact with models to understand complex concepts through visual exploration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section 
        className={styles.categoriesSection} 
        ref={(el) => (sectionsRef.current[1] = el)}
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
        className={styles.howItWorksSection} 
        ref={(el) => (sectionsRef.current[2] = el)}
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
        className={styles.featuredModelsSection} 
        ref={(el) => (sectionsRef.current[3] = el)}
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
        className={styles.testimonialsSection} 
        ref={(el) => (sectionsRef.current[4] = el)}
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
        className={styles.ctaSection} 
        ref={(el) => (sectionsRef.current[5] = el)}
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