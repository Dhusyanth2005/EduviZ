import { useState, useEffect, useRef } from "react";
import ModelViewer from "../../components/ModelSection/ModelViewer";
import ModelDescription from "../../components/ModelSection/ModelDescription";
import { FaSun, FaMoon, FaExpand, FaCompress, FaCamera, FaRedo, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import styles from './ModelPage.module.css';

export default function ModelPage({data}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modelViewerRef, setModelViewerRef] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [modelSrc, setModelSrc] = useState(null);
  const [isDismantleMode, setIsDismantleMode] = useState(true);
  const [selectedPart, setSelectedPart] = useState(null);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const appRef = useRef(null);

  const parts = Object.keys(data.parts);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchModel = async () => {
      const url = `${apiUrl}/model/${data.fullviewModel}`;
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
    const partFileId = data.parts[part].modelId;
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
        // Save the current camera orbit before playing animation
        const currentOrbit = modelViewerRef.current.getCameraOrbit();
        
        modelViewerRef.current.animationName = animations[0];
        modelViewerRef.current.play();
        setIsPlaying(true);
        
        setTimeout(() => {
          modelViewerRef.current.pause();
          setIsPlaying(false);
          setIsDismantleMode(!isDismantleMode);
          // Restore the camera orbit to its position before animation
          modelViewerRef.current.cameraOrbit = `${currentOrbit.theta}rad ${currentOrbit.phi}rad ${currentOrbit.radius}m`;
        }, 2500); // Your original fixed duration
      }
    }
  };

  const handleBackClick = async () => {
    setShowDetailView(false);
    setSelectedPart(null);
    const url = `${apiUrl}/model/${data.fullviewModel}`;
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

  // Fullscreen control
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      appRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Screenshot control
  const takeScreenshot = () => {
    if (modelViewerRef && modelViewerRef.current) {
      const url = modelViewerRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = `${data.name || "bicycle"}-screenshot.png`;
      link.href = url;
      link.click();
    }
  };

  // Reset model view control
  const resetModelView = () => {
    if (modelViewerRef && modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = "auto auto auto";
      modelViewerRef.current.fieldOfView = "auto";
    }
  };

  // Zoom controls for model-viewer
  const zoomIn = () => {
    if (modelViewerRef && modelViewerRef.current) {
      const orbitValues = modelViewerRef.current.getCameraOrbit();
      const currentRadius = orbitValues.radius;
      const newRadius = Math.max(currentRadius * 0.8, 1);
      modelViewerRef.current.cameraOrbit = `${orbitValues.theta}rad ${orbitValues.phi}rad ${newRadius}m`;
    }
  };

  const zoomOut = () => {
    if (modelViewerRef && modelViewerRef.current) {
      const orbitValues = modelViewerRef.current.getCameraOrbit();
      const currentRadius = orbitValues.radius;
      const newRadius = currentRadius * 1.5;
      modelViewerRef.current.cameraOrbit = `${orbitValues.theta}rad ${orbitValues.phi}rad ${newRadius}m`;
    }
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleModelViewerLoad = (ref) => setModelViewerRef(ref);

  return (
    <div 
      className={`${styles.modelPage} ${isDarkMode ? styles.dark : ''} ${isFullscreen ? styles.fullscreen : ''}`}
      ref={appRef}
    >
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
                {data.parts[part].name}
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
      
      {!showDetailView && (
        <div className={styles.viewerControls}>
          <button onClick={toggleFullscreen} className={styles.controlButton}>
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
          <button onClick={takeScreenshot} className={styles.controlButton}>
            <FaCamera />
          </button>
          <button onClick={resetModelView} className={styles.controlButton}>
            <FaRedo />
          </button>
          <button onClick={zoomIn} className={styles.controlButton} title="Zoom In">
            <FaSearchPlus />
          </button>
          <button onClick={zoomOut} className={styles.controlButton} title="Zoom Out">
            <FaSearchMinus />
          </button>
        </div>
      )}

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
            <ModelDescription selectedPart={selectedPart} isDarkMode={isDarkMode} data={data} />
          </div>
        </div>
      )}
    </div>
  );
}