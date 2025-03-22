// src/pages/LearnerDashboard.js
import React, { useState } from "react";
import styles from "./LearnerDashboard.module.css"; // Import scoped styles
import img from "../../images/img.jpg";
import { useNavigate } from "react-router-dom";

function LearnerDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Welcome");
  const Navigate = useNavigate();
  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const recommendedModels = [
    {
      id: 1,
      title: "Human Anatomy Explorer",
      price: "$24.99",
      imageUrl: img,
      description: "Interactive 3D model of the human body for biology students",
      isNew: true,
    },
    {
      id: 2,
      title: "Solar System Simulator",
      price: "$19.99",
      imageUrl: "/api/placeholder/200/120",
      description: "Explore planets and orbits in a dynamic 3D environment",
      isNew: false,
    },
    {
      id: 3,
      title: "Geometric Shapes Lab",
      price: "$14.99",
      imageUrl: "/api/placeholder/200/120",
      description: "Visualize and manipulate 3D geometric forms",
      isNew: true,
    },
  ];

  const userModels = [
    {
      id: 1,
      title: "Heart Dissection Model",
      created: "March 10, 2025",
      views: "1.2K",
      imageUrl: "/api/placeholder/200/120",
    },
    {
      id: 2,
      title: "Earth Layers Visualizer",
      created: "March 12, 2025",
      views: "850",
      imageUrl: "/api/placeholder/200/120",
    },
  ];

  const learningProgress = {
    exploredModels: 4,
    totalModels: 10,
    explorationPercentage: 40,
    nextModel: "Physics of Motion",
    hoursSpent: 15,
  };

  const userStats = [
    { label: "Models Explored", value: learningProgress.exploredModels },
    { label: "Models Purchased", value: userModels.length },
  ];

  const WelcomePage = () => (
    <div className={styles.welcomePage}>
      <div className={styles.welcomeHero}>
        <div className={styles.welcomeIntro}>
          <h1 className={styles.welcomeTitle}>Welcome back, John</h1>
          <p className={styles.welcomeSubtitle}>
            Explore interactive 3D models and enhance your visual learning:
          </p>

          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${learningProgress.explorationPercentage}%` }}
              ></div>
            </div>
            <p className={styles.progressText}>
              {learningProgress.explorationPercentage}% Explored -{" "}
              {learningProgress.exploredModels}/{learningProgress.totalModels}{" "}
              Models
            </p>
          </div>

          <div className={styles.upcomingCourse}>
            <h3>Next to Explore</h3>
            <div className={styles.coursePreview}>
              <div className={styles.coursePreviewIcon}></div>
              <div className={styles.coursePreviewInfo}>
                <h4>{learningProgress.nextModel}</h4>
                <button className={styles.primaryButton}>Start Exploring</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsOverview}>
          {userStats.map((stat, index) => (
            <div className={styles.statCard} key={index} onClick={()=>Navigate('/model')}>
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.recommendedSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recommended 3D Models</h2>
          <button className={styles.textButton}>Browse Marketplace</button>
        </div>
        <div className={styles.modelList}>
          {recommendedModels.map((model) => (
            <div className={styles.modelCard} key={model.id}>
              <div className={styles.modelImageContainer}>
                <img
                  src={model.imageUrl}
                  alt={model.title}
                  className={styles.modelImage}
                />
                {model.isNew && <span className={styles.modelBadge}>NEW</span>}
              </div>
              <div className={styles.modelContent}>
                <h3 className={styles.modelTitle}>{model.title}</h3>
                <p className={styles.modelDescription}>{model.description}</p>
                <div className={styles.modelFooter}>
                  <p className={styles.modelPrice}>{model.price}</p>
                  <button className={styles.modelActionButton}>Purchase</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h2 className={styles.sectionTitle}>Your Exploration Insights</h2>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <h3>Exploration Streak</h3>
            <div className={styles.streakDisplay}>
              <span className={styles.streakNumber}>5</span>
              <span className={styles.streakText}>days</span>
            </div>
            <p className={styles.insightTip}>
              Keep exploring daily to unlock new achievements!
            </p>
          </div>
          <div className={styles.insightCard}>
            <h3>Weekly Activity</h3>
            <div className={styles.focusChart}>
              <div className={styles.chartBar} style={{ height: "20%" }}></div>
              <div className={styles.chartBar} style={{ height: "35%" }}></div>
              <div className={styles.chartBar} style={{ height: "50%" }}></div>
              <div className={styles.chartBar} style={{ height: "65%" }}></div>
              <div className={styles.chartBar} style={{ height: "30%" }}></div>
              <div className={styles.chartBar} style={{ height: "15%" }}></div>
              <div
                className={`${styles.chartBar} ${styles.active}`}
                style={{ height: "45%" }}
              ></div>
            </div>
            <div className={styles.chartLabels}>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ModelViewer = () => (
    <div className={styles.modelViewer}>
      <h1 className={styles.pageTitle}>My 3D Models</h1>
      <div className={styles.modelList}>
        {userModels.map((model) => (
          <div className={styles.modelCard} key={model.id}>
            <div className={styles.modelImageContainer}>
              <img
                src={model.imageUrl}
                alt={model.title}
                className={styles.modelImage}
              />
            </div>
            <h3 className={styles.modelTitle}>{model.title}</h3>
            <p className={styles.modelDetails}>Created: {model.created}</p>
            <p className={styles.modelStatus}>Views: {model.views}</p>
            <button className={styles.modelActionButton}>Edit Model</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.dashboardRoot}> {/* Added wrapper */}
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.logoContainer}>
            <h2 className={styles.logo}>EduViz</h2>
          </div>
          <nav className={styles.sidebarNav}>
            <ul className={styles.menuList}>
              {["Welcome", "My Models", "Marketplace", "Forum", "Settings"].map(
                (item) => (
                  <li key={item} className={styles.menuItem}>
                    <button
                      onClick={() => handleMenuClick(item)}
                      className={`${styles.menuButton} ${
                        activeMenuItem === item ? styles.active : ""
                      }`}
                    >
                      <span className={styles.menuText}>{item}</span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
          <div className={styles.profilePreview}>
            <div className={styles.profileAvatar}>JD</div>
            <span className={styles.profileName}>John Doe</span>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.contentHeader}>
            {activeMenuItem !== "Welcome" && (
              <h1 className={styles.pageTitle}>{activeMenuItem}</h1>
            )}
            {activeMenuItem === "My Models" && (
              <div className={styles.headerActions}>
                <button className={styles.actionButton}>Upload New Model</button>
              </div>
            )}
          </header>

          {activeMenuItem === "Welcome" && <WelcomePage />}
          {activeMenuItem === "My Models" && <ModelViewer />}
          {activeMenuItem === "Marketplace" && (
            <p className={styles.placeholderText}>
              Browse and purchase 3D models coming soon!
            </p>
          )}
          {activeMenuItem === "Forum" && (
            <p className={styles.placeholderText}>Community forum coming soon!</p>
          )}
          {activeMenuItem === "Settings" && (
            <p className={styles.placeholderText}>Settings content coming soon!</p>
          )}
        </main>

        <aside className={styles.rightPanel}>
          <div className={styles.panelSection + " " + styles.notifications}>
            <h3 className={styles.panelTitle}>Notifications</h3>
            <div className={styles.notificationList}>
              <div className={`${styles.notificationItem} ${styles.unread}`}>
                <p className={styles.notificationText}>
                  New 3D model available: Chemistry Lab
                </p>
                <span className={styles.notificationTime}>2 hours ago</span>
              </div>
              <div className={styles.notificationItem}>
                <p className={styles.notificationText}>
                  Your model received 100 new views!
                </p>
                <span className={styles.notificationTime}>Yesterday</span>
              </div>
            </div>
          </div>

          <div className={styles.panelSection + " " + styles.chat}>
            <h3 className={styles.panelTitle}>EduViz Assistant</h3>
            <div className={styles.chatMessages}>
              <div className={styles.message + " " + styles.assistant}>
                <p>How can I assist with your 3D models today?</p>
              </div>
            </div>
            <form className={styles.chatForm}>
              <input
                type="text"
                placeholder="Type your message..."
                className={styles.chatInput}
              />
              <button type="submit" className={styles.chatSubmit}>
                Send
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default LearnerDashboard;