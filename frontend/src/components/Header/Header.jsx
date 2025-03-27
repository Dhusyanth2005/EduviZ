import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./Header.module.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const isLoggedIn = false;

  // Refs for GSAP animations
  const headerRef = useRef(null);
  const navLinksRef = useRef([]);
  const authButtonsRef = useRef(null);

  // Track last scroll position to determine scroll direction
  const lastScrollPositionRef = useRef(0);

  useEffect(() => {
    // Scroll effect
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
            backgroundColor: 'rgba(15, 16, 21, 0.9)', // Ensure background color change
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

    // Initial mount animation
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

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    
    // Run initial animation
    animateHeader();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          { to: "/", label: "Home" },
          { to: "/explore", label: "Explore Models" },
          { to: "/how-it-works", label: "How It Works" },
          { to: "/signup?role=creator", label: "Become a Creator" }
        ].map((link, index) => (
          <div 
            key={link.to} 
            ref={el => navLinksRef.current[index] = el}
            className={styles.navLinkItem}
          >
            <Link 
              to={link.to}
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
            </Link>
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
  );
};

export default Header;