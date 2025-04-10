import React, { useState, useEffect } from "react";
import styles from "./LearnerDashboard.module.css";
import img from "../../images/img.jpg"; // Default fallback image
import { useNavigate } from "react-router-dom";
import SettingsPage from "./SettingPage/SettingsPage";

function LearnerDashboard({ marketplaceModels }) {
  const [activeMenuItem, setActiveMenuItem] = useState("Welcome");
  const [createdModels, setCreatedModels] = useState([]); // State for fetched models
  const navigate = useNavigate();

  // Fetch all models with full schema content and handle modelCover images
  useEffect(() => {
    const fetchAllModels = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const userData = JSON.parse(jsonPayload);

          const response = await fetch("http://localhost:8080/api/models/all", {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include", // Include cookies/sessions
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch models: ${response.statusText}`);
          }

          const modelData = await response.json();
          console.log("Fetched models data:", modelData); // Debug log

          // Map the fetched models and fetch modelCover images
          const mappedModels = await Promise.all(modelData.map(async (model) => {
            let imageUrl = img; // Default fallback
            if (model.modelCover && model.modelCover !== 'default_cover.jpg') {
              try {
                const imageResponse = await fetch(`http://localhost:8080/model/${model.modelCover}`, {
                  headers: { Authorization: `Bearer ${token}` },
                  credentials: "include",
                });
                if (imageResponse.ok) {
                  const blob = await imageResponse.blob();
                  imageUrl = URL.createObjectURL(blob); // Create a temporary URL for the image
                } else {
                  console.warn(`Failed to fetch model cover for ID ${model.modelCover}: ${imageResponse.statusText}`);
                }
              } catch (error) {
                console.error(`Error fetching model cover for ID ${model.modelCover}:`, error);
              }
            }

            return {
              id: model._id,
              title: model.title,
              price: "$24.99", // Hardcoded; consider adding to schema
              imageUrl: imageUrl,
              description: model.description,
              isNew: (new Date() - new Date(model.createdAt)) < (7 * 24 * 60 * 60 * 1000), // Less than 7 days old
              category: model.category,
              views: model.views,
              instructorId: model.instructorId,
            };
          }));
          setCreatedModels(mappedModels);
        } catch (error) {
          console.error("Error fetching models:", error);
          setCreatedModels([]); // Set empty array on error
        }
      } else {
        console.warn("No token found, skipping model fetch");
        setCreatedModels([]);
      }
    };

    fetchAllModels();
  }, []);

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const handlebuttonmodelroute = () => {
    setActiveMenuItem("Marketplace");
  };

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
            <div className={styles.statCard} key={index} onClick={() => navigate('/model')}>
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.recommendedSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recommended 3D Models</h2>
          <button className={styles.textButton} onClick={handlebuttonmodelroute}>Browse Marketplace</button>
        </div>
        <div className={styles.modelList}>
          {createdModels.length > 0 ? (
            createdModels.map((model) => (
              <div className={styles.modelCard} key={model.id}>
                <div className={styles.modelImageContainer}>
                  <img
                    src={model.imageUrl}
                    alt={model.title}
                    className={styles.modelImage}
                    onError={(e) => { e.target.src = img; }} // Fallback to default image
                  />
                  {model.isNew && <span className={styles.modelBadge}>NEW</span>}
                </div>
                <div className={styles.modelContent}>
                  <h3 className={styles.modelTitle}>{model.title}</h3>
                  <p className={styles.modelDescription}>{model.description}</p>
                  <div className={styles.modelFooter}>
                    <p className={styles.modelPrice}>{model.price}</p>
                    <button 
                      className={styles.modelActionButton}
                      onClick={() => navigate(`/model/${model.id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.placeholderText}>No models available.</p>
          )}
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
            <button className={styles.modelActionButton}>Start Learning</button>
          </div>
        ))}
      </div>
    </div>
  );

  const MarketplacePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "Biology", "Physics", "Chemistry", "Astronomy", "Computer Science"];

    const filteredModels = selectedCategory === "All" 
      ? marketplaceModels 
      : marketplaceModels.filter(model => model.category === selectedCategory);

    const handleModelDetails = (modelId) => {
      navigate(`/model/${modelId}`);
    };

    return (
      <div className={styles.marketplacePage}>
        <div className={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategoryButton : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.marketplaceHeader}>
          <h2 className={styles.sectionTitle}>3D Model Marketplace</h2>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Search models..." 
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.modelList}>
          {filteredModels.map((model) => (
            <div className={styles.modelCard} key={model.id}>
              <div className={styles.modelImageContainer}>
                <img
                  src={model.imageUrl}
                  alt={model.title}
                  className={styles.modelImage}
                />
                {model.isNew && <span className={styles.modelBadge}>NEW</span>}
                <span className={styles.difficultyBadge}>{model.difficulty}</span>
              </div>
              <div className={styles.modelContent}>
                <h3 className={styles.modelTitle}>{model.title}</h3>
                <p className={styles.modelDescription}>{model.description}</p>
                <div className={styles.modelFooter}>
                  <div className={styles.modelMetadata}>
                    <span className={styles.modelCategory}>{model.category}</span>
                    <p className={styles.modelPrice}>{model.price}</p>
                  </div>
                  <button 
                    className={styles.modelActionButton}
                    onClick={() => handleModelDetails(model.id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.dashboardRoot}>
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
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.contentHeader}>
            {activeMenuItem !== "Welcome" && (
              <h1 className={styles.pageTitle}>{activeMenuItem}</h1>
            )}
            {activeMenuItem === "My Models" && (
              <div className={styles.headerActions}>
                <button className={styles.modelActionButton} onClick={handlebuttonmodelroute}>Explore more</button>
              </div>
            )}
          </header>

          {activeMenuItem === "Welcome" && <WelcomePage />}
          {activeMenuItem === "My Models" && <ModelViewer />}
          {activeMenuItem === "Marketplace" && <MarketplacePage />}
          {activeMenuItem === "Forum" && (
            <p className={styles.placeholderText}>Community forum coming soon!</p>
          )}
          {activeMenuItem === "Settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

export default LearnerDashboard;