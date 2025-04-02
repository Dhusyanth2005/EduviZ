import React, { useState, useRef } from "react";
import styles from "./InstructorDashboard.module.css";
import SettingPage from "./SettingPage/SettingsPage";
import WelcomePage from "./WelcomePage";
import { useNavigate } from "react-router-dom";

// Separate CreateModelForm component with enhanced features
function CreateModelForm({ onModelCreated, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [mainModel, setMainModel] = useState(null);
  const [keyframes, setKeyframes] = useState(0);
  const [framesPerSecond, setFramesPerSecond] = useState(24);
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({
    title: "",
    description: "",
    model: null
  });
  
  const mainModelInputRef = useRef(null);
  const partModelInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newModel = {
      id: Date.now(), // Simple unique ID
      title,
      description,
      category,
      mainModel: mainModel?.name || "No model uploaded",
      keyframes,
      framesPerSecond,
      parts,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      views: 0,
      isPublished: false,
    };
    onModelCreated(newModel);
    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setMainModel(null);
    setKeyframes(0);
    setFramesPerSecond(24);
    setParts([]);
  };

  const handleUploadClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleAddPart = () => {
    if (newPart.title && newPart.model) {
      setParts([...parts, { ...newPart, id: Date.now() }]);
      setNewPart({
        title: "",
        description: "",
        model: null
      });
    }
  };

  const handleRemovePart = (partId) => {
    setParts(parts.filter(part => part.id !== partId));
  };

  return (
    <div className={styles.createModelContainer}>
      <h2 className={styles.sectionTitle}>Create New 3D Model</h2>
      <form onSubmit={handleSubmit} className={styles.createModelForm}>
        {/* Model Basic Information */}
        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>Basic Information</h3>
          <div className={styles.formGroup}>
            <label>Model Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter model title"
              required
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your 3D model"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Biology">Biology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
        </div>

        {/* Model Files */}
        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>Model Files</h3>
          <div className={styles.formGroup}>
            <label>Upload Main 3D Model</label>
            <div className={styles.uploadContainer}>
              <input
                type="file"
                accept=".glb,.gltf,.fbx,.obj"
                onChange={(e) => setMainModel(e.target.files[0])}
                ref={mainModelInputRef}
                className={styles.hiddenFileInput}
              />
              <div className={styles.uploadIcon} onClick={() => handleUploadClick(mainModelInputRef)}>
                <span>↑</span>
              </div>
              {mainModel && <span className={styles.fileName}>{mainModel.name}</span>}
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Keyframes</label>
              <input
                type="number"
                value={keyframes}
                onChange={(e) => setKeyframes(parseInt(e.target.value) || 0)}
                min="0"
                placeholder="Number of keyframes"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Frames Per Second</label>
              <input
                type="number"
                value={framesPerSecond}
                onChange={(e) => setFramesPerSecond(parseInt(e.target.value) || 24)}
                min="1"
                max="120"
                placeholder="FPS"
              />
            </div>
          </div>
        </div>

        {/* Model Parts */}
        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>Model Parts</h3>
          
          {/* Add New Part Form */}
          <div className={styles.addPartForm}>
            <h4>Add New Part</h4>
            <div className={styles.formGroup}>
              <label>Part Title</label>
              <input
                type="text"
                value={newPart.title}
                onChange={(e) => setNewPart({...newPart, title: e.target.value})}
                placeholder="Enter part title"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Part Description</label>
              <textarea
                value={newPart.description}
                onChange={(e) => setNewPart({...newPart, description: e.target.value})}
                placeholder="Describe this part"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Upload Part Model</label>
              <div className={styles.uploadContainer}>
                <input
                  type="file"
                  accept=".glb,.gltf,.fbx,.obj"
                  onChange={(e) => setNewPart({...newPart, model: e.target.files[0]})}
                  ref={partModelInputRef}
                  className={styles.hiddenFileInput}
                />
                <div className={styles.uploadIcon} onClick={() => handleUploadClick(partModelInputRef)}>
                  <span>↑</span>
                </div>
                {newPart.model && <span className={styles.fileName}>{newPart.model.name}</span>}
              </div>
            </div>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleAddPart}
              disabled={!newPart.title || !newPart.model}
            >
              Add Part
            </button>
          </div>
          
          {/* Existing Parts List */}
          {parts.length > 0 && (
            <div className={styles.partsListContainer}>
              <h4>Added Parts ({parts.length})</h4>
              <div className={styles.partsList}>
                {parts.map((part, index) => (
                  <div key={part.id} className={styles.partCard}>
                    <div className={styles.partCardHeader}>
                      <span className={styles.partNumber}>{index + 1}</span>
                      <h5 className={styles.partTitle}>{part.title}</h5>
                      <button 
                        type="button" 
                        className={styles.removePartButton}
                        onClick={() => handleRemovePart(part.id)}
                        aria-label="Remove part"
                      >
                        ×
                      </button>
                    </div>
                    <div className={styles.partCardBody}>
                      <p className={styles.partDescription}>{part.description}</p>
                      <div className={styles.partFile}>
                        <span className={styles.fileIcon}>📄</span>
                        <span className={styles.fileName}>{part.model.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryButton}>
            Create Model
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function InstructorDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [models, setModels] = useState([
    {
      id: 1,
      title: "Human Anatomy Explorer",
      description: "Detailed 3D model of human body systems",
      category: "Biology",
      mainModel: "human_body.glb",
      keyframes: 24,
      framesPerSecond: 30,
      parts: [
        { id: 101, title: "Skeletal System", description: "Bones and joints", model: { name: "skeleton.glb" } },
        { id: 102, title: "Muscular System", description: "Major muscle groups", model: { name: "muscles.glb" } },
        { id: 103, title: "Circulatory System", description: "Heart and vessels", model: { name: "circulatory.glb" } }
      ],
      createdAt: "March 15, 2025",
      views: 1245,
      isPublished: true,
    },
    {
      id: 2,
      title: "Molecular Structure Visualizer",
      description: "Interactive 3D representation of chemical compounds",
      category: "Chemistry",
      mainModel: "molecule_base.glb",
      keyframes: 12,
      framesPerSecond: 24,
      parts: [
        { id: 201, title: "Atoms", description: "Individual atoms", model: { name: "atoms.glb" } },
        { id: 202, title: "Bonds", description: "Chemical bonds", model: { name: "bonds.glb" } }
      ],
      createdAt: "March 20, 2025",
      views: 876,
      isPublished: false,
    },
  ]);

  const navigate = useNavigate();

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const handleModelCreated = (newModel) => {
    setModels([...models, newModel]);
    setActiveMenuItem("My Models");
  };

  const togglePublishStatus = (id) => {
    setModels(
      models.map((model) =>
        model.id === id ? { ...model, isPublished: !model.isPublished } : model
      )
    );
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
            {models.filter((model) => model.isPublished).length}
          </div>
        </div>
        <div className={styles.statCard}>
          <h3>Total Views</h3>
          <div className={styles.statValue}>
            {models.reduce((total, model) => total + model.views, 0)}
          </div>
        </div>
        <div className={styles.statCard}>
          <h3>Total Parts</h3>
          <div className={styles.statValue}>
            {models.reduce((total, model) => total + (model.parts?.length || 0), 0)}
          </div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          {models.slice(0, 3).map((model) => (
            <div key={model.id} className={styles.activityItem}>
              <span className={styles.activityIcon}>
                {model.category.charAt(0)}
              </span>
              <div className={styles.activityDetails}>
                <h4>{model.title}</h4>
                <p>
                  {model.isPublished ? "Published" : "Draft"} • {model.createdAt}
                </p>
                <small>{model.parts?.length || 0} parts</small>
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
        {models.map((model) => (
          <div key={model.id} className={styles.modelCard}>
            <div className={styles.modelCardHeader}>
              <h3>{model.title}</h3>
              <span
                className={`${styles.publishBadge} ${
                  model.isPublished ? styles.published : styles.draft
                }`}
              >
                {model.isPublished ? "Published" : "Draft"}
              </span>
            </div>
            <div className={styles.modelCardContent}>
              <p>{model.description}</p>
              <div className={styles.modelMetadata}>
                <span>Created: {model.createdAt}</span>
                <span>Views: {model.views}</span>
                <span>Parts: {model.parts?.length || 0}</span>
              </div>
            </div>
            <div className={styles.modelCardActions}>
              <button
                className={styles.secondaryButton}
                onClick={() => togglePublishStatus(model.id)}
              >
                {model.isPublished ? "Unpublish" : "Publish"}
              </button>
              <button className={styles.tertiaryButton}>Edit Model</button>
            </div>
          </div>
        ))}
      </div>
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
              {[
                "Dashboard",
                "My Models",
                "Create Model",
                "Analytics",
                "Settings",
              ].map((item) => (
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
              ))}
            </ul>
          </nav>
         
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.contentHeader}>
            {activeMenuItem !== "Dashboard" && (
              <h1 className={styles.pageTitle}>{activeMenuItem}</h1>
            )}
          </header>

          {activeMenuItem === "Dashboard" && <WelcomePage models={models} />}
          {activeMenuItem === "My Models" && <ModelManagement />}
          {activeMenuItem === "Create Model" && (
            <CreateModelForm
              onModelCreated={handleModelCreated}
              onCancel={() => setActiveMenuItem("My Models")}
            />
          )}
          {activeMenuItem === "Analytics" && (
            <p className={styles.placeholderText}>Analytics coming soon!</p>
          )}
          {activeMenuItem === "Settings" && <SettingPage />}
        </main>
      </div>
    </div>
  );
}

export default InstructorDashboard;