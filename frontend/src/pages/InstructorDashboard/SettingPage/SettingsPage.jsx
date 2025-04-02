import React, { useState } from 'react';
import styles from './SettingPage.module.css';
import globalStyles from '../InstructorDashboard.module.css';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const settingsSections = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'account', label: 'Account Security', icon: '🔒' },
    { key: 'subscriptions', label: 'Subscriptions', icon: '📅' },
    { key: 'payments', label: 'Payment Methods', icon: '💳' },
    { key: 'privacy', label: 'Privacy', icon: '🕵️' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'messages', label: 'Messages', icon: '💬' },
    { key: 'purchase-history', label: 'Purchase History', icon: '📋' },
    { key: 'help', label: 'Help and Support', icon: '❓' },
    { key: 'view-profile', label: 'View Profile', icon: '👀' },
    { key: 'logout', label: 'Logout', icon: '🚪' }
  ];

  const ProfileSettings = () => {
    const [firstName, setFirstName] = useState('Dhusyanth');
    const [lastName, setLastName] = useState('');
    const [headline, setHeadline] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [language, setLanguage] = useState('English (US)');

    const handleSave = () => {
      alert('Profile updated successfully!');
    };

    return (
      <div className={styles.settingsContent}>
        <h1 className={globalStyles.pageTitle}>Public Profile</h1>
        <p className={globalStyles.welcomeSubtitle}>Add information about yourself</p>

        <div className={styles.settingsContainer}>
          <div className={styles.profileImageContainer}>
            <div className={`${globalStyles.profileAvatar} ${globalStyles.largeAvatar}`}>
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
              placeholder="Headline (e.g., Student at Eduviz)"
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
              className={globalStyles.primaryButton}
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  };

  const AccountSecurity = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = () => {
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      alert('Password changed successfully!');
    };

    return (
      <div className={styles.settingsContent}>
        <h1 className={globalStyles.pageTitle}>Account Security</h1>
        <p className={globalStyles.welcomeSubtitle}>Manage your account security settings</p>

        <div className={styles.securitySection}>
          <h3 className={styles.sectionTitle}>Change Password</h3>
          <div className={styles.passwordInputGroup}>
            <input 
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.settingsInput}
            />
            <input 
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.settingsInput}
            />
            <button 
              className={globalStyles.primaryButton}
              onClick={handlePasswordChange}
            >
              Change Password
            </button>
          </div>

          <div className={styles.mfaSection}>
            <h3 className={styles.sectionTitle}>Multi-factor Authentication</h3>
            <p className={styles.securityDescription}>
              Increase your account security by requiring a code emailed to you when logging in.
            </p>
            <button className={globalStyles.primaryButton}>
              Enable Multi-factor Authentication
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ViewProfile = () => {
    return (
      <div className={styles.settingsContent}>
        <h1 className={globalStyles.pageTitle}>My Profile</h1>
        <div className={styles.profileViewContainer}>
          <div className={`${globalStyles.profileAvatar} ${globalStyles.largeAvatar}`}>
            D
          </div>
          <h2>Dhusyanth</h2>
          <p>Web Developer</p>
          <div className={styles.profileDetails}>
            <p>Email: dhusyanth@example.com</p>
            <p>Location: New York, USA</p>
            <p>Member Since: January 2024</p>
          </div>
        </div>
      </div>
    );
  };

  const LogoutConfirmation = () => {
    const handleLogout = () => {
      alert('Logging out...');
      // Implement actual logout logic here
    };

    return (
      <div className={styles.settingsContent}>
        <h1 className={globalStyles.pageTitle}>Logout</h1>
        <div className={styles.logoutContainer}>
          <p>Are you sure you want to log out?</p>
          <button 
            className={globalStyles.primaryButton}
            onClick={handleLogout}
          >
            Confirm Logout
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.settingsPageContainer}>
      <div className={styles.settingsSidebar}>
      <div className={styles.userProfileHeader}>
          <div className={styles.profileAvatar}>D</div>
          <div className={styles.profileDetails}>
            <span className={styles.profileName}>Dhusyanth</span>
            <span className={styles.profileEmail}>dhusyanth@example.com</span>
          </div>
        </div>
        
        <div className={styles.settingsNavigation}>
          {settingsSections.map((section) => (
            <button
              key={section.key}
              className={`${styles.settingsNavItem} ${activeSection === section.key ? styles.active : ''}`}
              onClick={() => setActiveSection(section.key)}
            >
              <span className={styles.navItemIcon}>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.settingsMainContent}>
        {activeSection === 'profile' && <ProfileSettings />}
        {activeSection === 'account' && <AccountSecurity />}
        {activeSection === 'view-profile' && <ViewProfile />}
        {activeSection === 'logout' && <LogoutConfirmation />}
        {['subscriptions', 'payments', 'privacy', 'notifications', 'messages', 'purchase-history', 'help'].includes(activeSection) && (
          <div className={styles.settingsContent}>
            <h1 className={globalStyles.pageTitle}>{settingsSections.find(s => s.key === activeSection).label}</h1>
            <p className={globalStyles.welcomeSubtitle}>Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;