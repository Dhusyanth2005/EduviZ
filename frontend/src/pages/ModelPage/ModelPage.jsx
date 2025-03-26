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
  const [error, setError] = useState('');

  const parts = Object.keys(bicycleData.parts);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchModel = async () => {
      const url = `${apiUrl}/model/${bicycleData.fullviewModel}`;
      console.log('Fetching full model from:', url); // Debug log
      try {
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          throw new Error(`Failed to fetch model: ${response.status}`);
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setModelSrc(blobUrl);
        setError('');
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load model. Please try again.');
      }
    };
    fetchModel();
  }, [apiUrl]);

  const handlePartSelect = async (part) => {
    const partFileId = bicycleData.parts[part].modelId;
    const url = `${apiUrl}/model/${partFileId}`;
    console.log('Fetching part model from:', url); // Debug log
    try {
      const response = await fetch(url, { credentials: 'include' });
      if (!response.ok) {
        throw new Error(`Failed to fetch part model: ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setModelSrc(blobUrl);
      setSelectedPart(part);
      setShowDetailView(true);
      setIsDrawerOpen(false);
      setError('');
    } catch (err) {
      console.error('Part fetch error:', err);
      setError('Failed to load part model.');
    }
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

  const handleBackClick = async () => {
    setShowDetailView(false);
    setSelectedPart(null);
    const url = `${apiUrl}/model/${bicycleData.fullviewModel}`;
    try {
      const response = await fetch(url, { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch full model');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setModelSrc(blobUrl);
      setError('');
    } catch (err) {
      console.error('Back fetch error:', err);
      setError('Failed to reload full model.');
    }
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
                className={selectedPart === part ? styles.selected : ''}
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

      {error && <p className={styles.error}>{error}</p>}

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