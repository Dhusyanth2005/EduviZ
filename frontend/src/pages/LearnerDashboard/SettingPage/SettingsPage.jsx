import React, { useState } from 'react';
import styles from '../LearnerDashboard.module.css';

function SettingsPage() {
  const [firstName, setFirstName] = useState('Dhusyanth');
  const [lastName, setLastName] = useState('');
  const [headline, setHeadline] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [language, setLanguage] = useState('English (US)');

  const handleSave = () => {
    // Implement save logic here
    alert('Profile updated successfully!');
  };

  return (
    <div className={styles.settingsPage}>
      <h1 className={styles.pageTitle}>Public Profile</h1>
      <p className={styles.welcomeSubtitle}>Add information about yourself</p>

      <div className={styles.settingsContainer}>
        <div className={styles.profileImageContainer}>
          <div className={`${styles.profileAvatar} ${styles.largeAvatar}`}>
            D
          </div>
          <button className={styles.textButton}>Change Photo</button>
        </div>

        <div className={styles.settingsForm}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Basics:</h3>
            <input 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className={styles.settingsInput}
            />
            <input 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className={styles.settingsInput}
            />
            <input 
              type="text" 
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Headline (e.g., Instructor at Udemy)"
              className={styles.settingsInput}
              maxLength={60}
            />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={styles.settingsInput}
            >
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Links:</h3>
            <div className={styles.linkInputGroup}>
              <span className={styles.linkPrefix}>https://</span>
              <input 
                type="text" 
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website URL"
                className={styles.settingsInputWithPrefix}
              />
            </div>
            <div className={styles.linkInputGroup}>
              <span className={styles.linkPrefix}>facebook.com/</span>
              <input 
                type="text" 
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Username"
                className={styles.settingsInputWithPrefix}
              />
            </div>
            <div className={styles.linkInputGroup}>
              <span className={styles.linkPrefix}>instagram.com/</span>
              <input 
                type="text" 
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Username"
                className={styles.settingsInputWithPrefix}
              />
            </div>
            <div className={styles.linkInputGroup}>
              <span className={styles.linkPrefix}>linkedin.com/</span>
              <input 
                type="text" 
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="Public Profile URL"
                className={styles.settingsInputWithPrefix}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button 
              className={styles.primaryButton}
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;