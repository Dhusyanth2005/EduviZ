import { useState, useEffect } from "react";
import ModelViewer from "../../components/ModelSection/ModelViewer";
import ModelDescription from "../../components/ModelSection/ModelDescription";
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './ModelPage.module.css';
import { bicycleData } from '../../bicycleData';

export default function ModelPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modelViewerRef, setModelViewerRef] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [modelSrc, setModelSrc] = useState(null);
  const [isDismantleMode, setIsDismantleMode] = useState(true);
  const [selectedPart, setSelectedPart] = useState(null);

  const parts = Object.keys(bicycleData.parts);

  useEffect(() => {
    const url = `http://localhost:3001/model/${bicycleData.fullviewModel}`;
    setModelSrc(url);
  }, []);

  const handlePartSelect = (part) => {
    const partFileId = bicycleData.parts[part].modelId;
    const url = `http://localhost:3001/model/${partFileId}`;
    setModelSrc(url);
    setSelectedPart(part);
    setShowDetailView(true);
    setIsDrawerOpen(false);
  };

  const handleToggleAnimation = () => {
    if (modelViewerRef && modelViewerRef.current) {
      const animations = modelViewerRef.current.availableAnimations;
      if (animations.length > 0) {
        modelViewerRef.current.animationName = animations[0];
        modelViewerRef.current.play();
        setIsPlaying(true);
        setTimeout(() => {
          modelViewerRef.current.pause();
          setIsPlaying(false);
          setIsDismantleMode(!isDismantleMode);
        }, 2500);
      }
    }
  };

  const handleBackClick = () => {
    setShowDetailView(false);
    setSelectedPart(null);
    const url = `http://localhost:3001/model/${bicycleData.fullviewModel}`;
    setModelSrc(url);
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleModelViewerLoad = (ref) => setModelViewerRef(ref);

  return (
    <div className={`${styles.modelPage} ${isDarkMode ? styles.dark : ''}`}>
      <header className={styles.header}>
        <h1>Eduviz-Viewer</h1>
        <div className={styles.headerControls}>
          <button onClick={toggleDrawer} className={styles.menuButton}>Parts</button>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.drawerContent}>
          <h2>Parts</h2>
          <ul>
            {parts.map((part) => (
              <li
                key={part}
                onClick={() => handlePartSelect(part)}
                className={selectedPart === part ? 'selected' : ''} // Define 'selected' in CSS if needed
              >
                {bicycleData.parts[part].name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isDrawerOpen && <div className={styles.overlay} onClick={toggleDrawer}></div>}

      <div className={styles.controls}>
        {!showDetailView && (
          <button 
            onClick={handleToggleAnimation} 
            disabled={isPlaying} 
            className={styles.playButton}
          >
            {isDismantleMode ? "Dismantle" : "Assemble"}
          </button>
        )}
        {showDetailView && (
          <button onClick={handleBackClick} className={styles.backButton}>Back to Full View</button>
        )}
      </div>

      {!showDetailView ? (
        <div className={styles.modelContainer}>
          {modelSrc ? (
            <ModelViewer 
              modelSrc={modelSrc}
              isPlaying={isPlaying}
              showDetailView={showDetailView}
              onLoad={handleModelViewerLoad}
            />
          ) : (
            <p>Loading model...</p>
          )}
        </div>
      ) : (
        <div className={styles.splitView}>
          <div className={`${styles.modelContainer} ${styles.modelContainerHalf}`}>
            {modelSrc ? (
              <ModelViewer 
                modelSrc={modelSrc}
                isPlaying={isPlaying}
                showDetailView={showDetailView}
                onLoad={handleModelViewerLoad}
              />
            ) : (
              <p>Loading model...</p>
            )}
          </div>
          <div className={styles.descriptionContainer}>
          <ModelDescription selectedPart={selectedPart} isDarkMode={isDarkMode} />
          </div>
        </div>
      )}
    </div>
  );
}