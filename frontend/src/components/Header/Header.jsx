import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.headerWrapper} ${scrolled ? styles.scrolled : ""}`}>
      <Link to="/">
        <div className={styles.logo}>EduViz</div>
      </Link>

      <nav className={styles.navLinks}>
        <div className={styles.navLinkItem}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.navLinkItem}>
          <Link to="/explore">Explore Models</Link>
        </div>
        <div className={styles.navLinkItem}>
          <Link to="/how-it-works">How It Works</Link>
        </div>
        <div className={styles.navLinkItem}>
          <Link to="/signup?role=creator">Become a Creator</Link>
        </div>
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
              <div className={styles.dropdownItem}>
                <Link to="/dashboard">Dashboard</Link>
              </div>
              <div className={styles.dropdownItem}>
                <Link to="/settings">Settings</Link>
              </div>
              <div className={styles.dropdownItem}>Logout</div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link to="/login">
            <button className={styles.button}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={`${styles.button} ${styles.primary}`}>Sign Up</button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;