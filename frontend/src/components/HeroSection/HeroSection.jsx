// HeroSection.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./HeroSection.module.css"; // Ensure this matches your file path

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate shapes
    shapesRef.current.forEach((shape, index) => {
      if (shape) {
        gsap.fromTo(
          shape,
          {
            opacity: 0,
            scale: 0.8,
            rotation: index * 15,
            x: index % 2 === 0 ? -100 : 100,
          },
          {
            opacity: 0.4,
            scale: 1,
            rotation: 0,
            x: 0,
            duration: 2,
            delay: index * 0.2,
            ease: "elastic.out(1, 0.8)",
          }
        );

        gsap.to(shape, {
          y: () => Math.sin(index + 1) * 50,
          rotation: () => Math.cos(index + 1) * 10,
          duration: 6 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    // Animate content
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30, rotationX: -10 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.5,
      }
    );

    // Button hover effects
    const buttons = heroRef.current.querySelectorAll(`.${styles.ctaButton}`);
    buttons.forEach((button) => {
      const onEnter = () =>
        gsap.to(button, {
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(102, 23, 203, 0.5)",
          duration: 0.3,
          ease: "power2.out",
        });
      const onLeave = () =>
        gsap.to(button, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
        });

      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mouseleave", onLeave);

      return () => {
        button.removeEventListener("mouseenter", onEnter);
        button.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  return (
    <section className={styles.heroWrapper} ref={heroRef}>
      <div className={styles.heroBackground}>
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`${styles.shape} ${styles[`shape${num}`]}`}
            ref={(el) => (shapesRef.current[num - 1] = el)}
          />
        ))}
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={styles.heroContent} ref={contentRef}>
        <span className={styles.heroBadge}>Revolutionary Learning Platform</span>
        <h1 className={styles.heroHeadline}>
          Learn Visually with Interactive 3D Models
        </h1>
        <p className={styles.heroSubtext}>
          EduViz is a marketplace for interactive 3D learning models. Explore,
          learn, and create like never before!
        </p>
        <div className={styles.heroFeatures}>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Explore 1000+ 3D Models</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Interactive Learning</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureText}>Sell Your Creations</span>
          </div>
        </div>
        <div className={styles.heroCta}>
          <Link to="/explore">
            <button className={styles.ctaButton}>Explore Models</button>
          </Link>
          <Link to="/signup?role=creator">
            <button className={`${styles.ctaButton} ${styles.primary}`}>
              Become a Creator
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;