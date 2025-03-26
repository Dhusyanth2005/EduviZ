import React, { useState, useRef } from "react";
import styles from "./InstructorDashboard.module.css";
import { useNavigate } from "react-router-dom";

function InstructorDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [models, setModels] = useState([
    {
      id: 1,
      title: "Human Anatomy Explorer",
      description: "Detailed 3D model of human body systems",
      category: "Biology",
      createdAt: "March 15, 2025",
      views: 1245,
      isPublished: true
    },
    {
      id: 2,
      title: "Molecular Structure Visualizer",
      description: "Interactive 3D representation of chemical compounds",
      category: "Chemistry",
      createdAt: "March 20, 2025",
      views: 876,
      isPublished: false
    }
  ]);

  const [newModel, setNewModel] = useState({
    title: "",
    description: "",
    category: "",
    file: null
  });

  const fileInputRef = useRef(null); // Add useRef for file input
  const Navigate = useNavigate();

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const handleNewModelChange = (e) => {
    const { name, value, files } = e.target;
    setNewModel(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmitModel = (e) => {
    e.preventDefault();
    const modelToAdd = {
      id: models.length + 1,
      ...newModel,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      views: 0,
      isPublished: false
    };

    setModels([...models, modelToAdd]);
    setNewModel({ title: "", description: "", category: "", file: null });
    setActiveMenuItem("My Models");
  };

  const togglePublishStatus = (id) => {
    setModels(models.map(model => 
      model.id === id 
        ? { ...model, isPublished: !model.isPublished } 
        : model
    ));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const DashboardOverview = () => (
    <div className={styles.dashboardOverview}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Models</h3>
          <div className={styles.statValue}>{models.length}</div>
        </div>
        <div className={styles.statCard}>
          <h3>Published Models</h3>
          <div className={styles.statValue}>
            {models.filter(model => model.isPublished).length}
          </div>
        </div>
        <div className={styles.statCard}>
          <h3>Total Views</h3>
          <div className={styles.statValue}>
            {models.reduce((total, model) => total + model.views, 0)}
          </div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          {models.slice(0, 3).map(model => (
            <div key={model.id} className={styles.activityItem}>
              <span className={styles.activityIcon}>
                {model.category.charAt(0)}
              </span>
              <div className={styles.activityDetails}>
                <h4>{model.title}</h4>
                <p>{model.isPublished ? 'Published' : 'Draft'} • {model.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ModelManagement = () => (
    <div className={styles.modelManagement}>
      <div className={styles.modelListHeader}>
        <h2 className={styles.sectionTitle}>My 3D Models</h2>
        <button 
          className={styles.primaryButton}
          onClick={() => setActiveMenuItem("Create Model")}
        >
          Create New Model
        </button>
      </div>
      <div className={styles.modelGrid}>
        {models.map(model => (
          <div key={model.id} className={styles.modelCard}>
            <div className={styles.modelCardHeader}>
              <h3>{model.title}</h3>
              <span 
                className={`${styles.publishBadge} ${model.isPublished ? styles.published : styles.draft}`}
              >
                {model.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className={styles.modelCardContent}>
              <p>{model.description}</p>
              <div className={styles.modelMetadata}>
                <span>Created: {model.createdAt}</span>
                <span>Views: {model.views}</span>
              </div>
            </div>
            <div className={styles.modelCardActions}>
              <button 
                className={styles.secondaryButton}
                onClick={() => togglePublishStatus(model.id)}
              >
                {model.isPublished ? 'Unpublish' : 'Publish'}
              </button>
              <button className={styles.tertiaryButton}>
                Edit Model
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CreateModelForm = () => (
    <div className={styles.createModelContainer}>
      <h2 className={styles.sectionTitle}>Create New 3D Model</h2>
      <form onSubmit={handleSubmitModel} className={styles.createModelForm}>
        <div className={styles.formGroup}>
          <label>Model Title</label>
          <input
            type="text"
            name="title"
            value={newModel.title}
            onChange={handleNewModelChange}
            placeholder="Enter model title"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={newModel.description}
            onChange={handleNewModelChange}
            placeholder="Describe your 3D model"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <select
            name="category"
            value={newModel.category}
            onChange={handleNewModelChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Upload 3D Model</label>
          <div className={styles.uploadContainer}>
            <input
              type="file"
              name="file"
              accept=".obj,.fbx,.stl"
              onChange={handleNewModelChange}
              ref={fileInputRef}
              className={styles.hiddenFileInput}
            />
            <div 
              className={styles.uploadIcon}
              onClick={handleUploadClick}
            >
              <span>↑</span>
            </div>
            {newModel.file && (
              <span className={styles.fileName}>{newModel.file.name}</span>
            )}
          </div>
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryButton}>
            Create Model
          </button>
          <button 
            type="button" 
            className={styles.secondaryButton}
            onClick={() => setActiveMenuItem("My Models")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.logoContainer}>
            <h2 className={styles.logo}>EduViz</h2>
          </div>
          <nav className={styles.sidebarNav}>
            <ul className={styles.menuList}>
              {["Dashboard", "My Models", "Create Model", "Analytics", "Settings"].map(
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
            {activeMenuItem !== "Dashboard" && (
              <h1 className={styles.pageTitle}>{activeMenuItem}</h1>
            )}
          </header>

          {activeMenuItem === "Dashboard" && <DashboardOverview />}
          {activeMenuItem === "My Models" && <ModelManagement />}
          {activeMenuItem === "Create Model" && <CreateModelForm />}
          {activeMenuItem === "Analytics" && (
            <p className={styles.placeholderText}>Analytics coming soon!</p>
          )}
          {activeMenuItem === "Settings" && (
            <p className={styles.placeholderText}>Settings coming soon!</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default InstructorDashboard;