import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const sectionRefs = useRef([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Prevent animation if refs are not ready
    if (!footerRef.current) return;

    // Reset all sections and children to initial state
    const sections = sectionRefs.current;
    sections.forEach((section) => {
      if (section) {
        gsap.set(section, { opacity: 0, y: 30 });
        Array.from(section.children).forEach(child => {
          gsap.set(child, { opacity: 0, y: 20 });
        });
      }
    });

    // Animate footer sections
    sections.forEach((section, index) => {
      if (section) {
        // Animate section
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

        // Animate children (links, social icons, etc.) within each section
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

    // Animate footer bottom
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

    // Cleanup function to kill ScrollTrigger instances
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
            Revolutionizing education through interactive 3D models and visual
            learning experiences.
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
          <h3 className={styles.footerHeading}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore Models</Link>
            </li>
            <li>
              <Link to="/how-it-works">How It Works</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          <h3 className={styles.footerHeading}>For Creators</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/signup?role=creator">Become a Creator</Link>
            </li>
            <li>
              <Link to="/creator-guidelines">Creator Guidelines</Link>
            </li>
            <li>
              <Link to="/creator-faq">Creator FAQ</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
          </ul>
        </div>

        <div
          className={styles.footerSection}
          ref={(el) => (sectionRefs.current[3] = el)}
        >
          <h3 className={styles.footerHeading}>Newsletter</h3>
          <p className={styles.footerDescription}>
            Subscribe to get the latest updates on new models and features.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterButton}>Subscribe</button>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom} ref={bottomRef}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} EduViz. All rights reserved.
        </p>
        <div className={styles.footerLegal}>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;