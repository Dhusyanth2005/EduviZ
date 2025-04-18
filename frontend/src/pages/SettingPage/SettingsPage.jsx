import React, { useState, useEffect, useRef } from 'react';
import styles from './SettingPage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({ fullName: 'Dhusyanth', email: 'dhusyanth@example.com', profilePicture: '' });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const settingsSections = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'account', label: 'Account Security', icon: '🔒' },
    { key: 'purchase-history', label: 'Purchase History', icon: '📋' },
    { key: 'view-profile', label: 'View Profile', icon: '👀' },
    { key: 'logout', label: 'Logout', icon: '🚪' }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${apiUrl}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const { fullName, email, profilePicture } = response.data;
          setUserData({ fullName, email, profilePicture });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData({ fullName: 'Dhusyanth', email: 'dhusyanth@example.com', profilePicture: '' });
        }
      }
    };
    fetchUserData();
  }, [apiUrl]);

  const ProfileSettings = () => {
    const [firstName, setFirstName] = useState(userData.fullName.split(' ')[0] || 'Dhusyanth');
    const [lastName, setLastName] = useState(userData.fullName.split(' ')[1] || '');
    const [headline, setHeadline] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [language, setLanguage] = useState('English (US)');
    const [profileImage, setProfileImage] = useState(userData.profilePicture);
    const [previewImage, setPreviewImage] = useState(userData.profilePicture ? `${apiUrl}/model/${userData.profilePicture}` : null);

    const handleImageChange = async (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
          setPreviewImage(event.target.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('profileImage', file);

        const token = localStorage.getItem('token');
        console.log('Sending request with token:', token);
        try {
          const response = await axios.post(`${apiUrl}/api/auth/upload-profile-image`, formData, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
              withCredentials: true,
            },
          });
          console.log('Upload response:', response.data);
          if (response.data.fileId) {
            setUserData(prev => ({ ...prev, profilePicture: response.data.fileId }));
            setProfileImage(response.data.fileId);
            setPreviewImage(`${apiUrl}/model/${response.data.fileId}`);
            await fetchUserData(); // Refresh user data
          }
        } catch (error) {
          console.error('Upload error:', error.response ? error.response.data : error.message);
          alert('Failed to upload profile image');
        }
      }
    };

    const triggerFileInput = () => {
      fileInputRef.current.click();
    };

    const handleSave = () => {
      alert('Profile updated successfully!');
      // TODO: Implement API call to update user data (fullName, etc.) if needed
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${apiUrl}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const { fullName, email, profilePicture } = response.data;
          setUserData({ fullName, email, profilePicture });
          setPreviewImage(profilePicture ? `${apiUrl}/model/${profilePicture}` : null);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    return (
      <div className={styles.settingsContent}>
        <h1 className={styles.pageTitle}>Public Profile</h1>
        <p className={styles.welcomeSubtitle}>Add information about yourself</p>

        <div className={styles.settingsContainer}>
          <div className={styles.profileImageContainer}>
            <div className={`${styles.profileAvatar} ${styles.largeAvatar}`} onClick={triggerFileInput}>
              {previewImage ? (
                <img src={previewImage} alt="Profile" className={styles.avatarImage} />
              ) : (
                userData.fullName[0] || 'D'
              )}
              <div className={styles.avatarUploadOverlay}>
                <span className={styles.avatarUploadIcon}>📷</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                className={styles.fileInputHidden} 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </div>
            <button className={styles.textButton} onClick={triggerFileInput}>
              Change Photo
            </button>
          </div>

          <div className={styles.settingsForm}>
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Basics</h3>
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
              <h3 className={styles.sectionTitle}>Links</h3>
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
        <h1 className={styles.pageTitle}>Account Security</h1>
        <p className={styles.welcomeSubtitle}>Manage your account security settings</p>

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
              className={styles.primaryButton}
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
            <button className={styles.primaryButton}>
              Enable Multi-factor Authentication
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ViewProfile = () => {
    const profileImageUrl = userData.profilePicture ? `${apiUrl}/model/${userData.profilePicture}` : null;

    return (
      <div className={styles.settingsContent}>
        <h1 className={styles.pageTitle}>My Profile</h1>
        <div className={styles.profileViewContainer}>
          <div className={`${styles.profileAvatar} ${styles.largeAvatar}`}>
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="Profile" className={styles.avatarImage} />
            ) : (
              userData.fullName[0] || 'D'
            )}
          </div>
          <h2>{userData.fullName}</h2>
          <p>Web Developer</p>
          <div className={styles.profileDetails}>
            <p>Email: {userData.email}</p>
            <p>Location: New York, USA</p>
            <p>Member Since: January 2024</p>
          </div>
        </div>
      </div>
    );
  };

  const LogoutConfirmation = () => {
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    return (
      <div className={styles.settingsContent}>
        <h1 className={styles.pageTitle}>Logout</h1>
        <div className={styles.logoutContainer}>
          <p>Are you sure you want to log out?</p>
          <button 
            className={styles.primaryButton}
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
        <div className={styles.stackedProfileHeader}>
          <div className={styles.stackedProfileAvatar}>{userData.fullName[0] || 'D'}</div>
          <div className={styles.stackedProfileInfo}>
            <span className={styles.stackedProfileName}>{userData.fullName}</span>
            <span className={styles.stackedProfileEmail}>{userData.email}</span>
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
        {['purchase-history'].includes(activeSection) && (
          <div className={styles.settingsContent}>
            <h1 className={styles.pageTitle}>{settingsSections.find(s => s.key === activeSection).label}</h1>
            <p className={styles.welcomeSubtitle}>Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;