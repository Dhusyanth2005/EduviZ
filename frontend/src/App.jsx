import { useState, useEffect } from "react";
import ModelViewer from "./components/ModelViewer";
import ModelDescription from "./components/ModelDescription";
import { FaSun, FaMoon } from 'react-icons/fa';
import './App.css';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modelViewerRef, setModelViewerRef] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modelSrc, setModelSrc] = useState(null); // Dynamic model source

  const parts = ["Part 1", "Part 2", "Part 3", "Part 4", "Part 5"];

  // Fetch model from backend when component mounts
  useEffect(() => {
    const fileId = '67cbea75ef6e7007d6ad8372'; // Replace with a real fileId from upload
    const url = `http://localhost:3001/model/${fileId}`;
    setModelSrc(url); // Set the model source to the backend URL
  }, []);

  // Handle play animation
  const handlePlayAnimation = () => {
    if (modelViewerRef && modelViewerRef.current) {
      const animations = modelViewerRef.current.availableAnimations;
      if (animations.length > 0) {
        modelViewerRef.current.animationName = animations[0];
        modelViewerRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle stop animation
  const handleStopAnimation = () => {
    if (modelViewerRef && modelViewerRef.current) {
      modelViewerRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleDetailViewClick = () => setShowDetailView(true);
  const handleBackClick = () => setShowDetailView(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleModelViewerLoad = (ref) => setModelViewerRef(ref);

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header className="header">
        <h1>3D Model Viewer</h1>
        <div className="header-controls">
          <button onClick={toggleDrawer} className="menu-button">Parts</button>
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-content">
          <h2>Parts</h2>
          <ul>
            {parts.map((part) => (
              <li
                key={part}
                onClick={() => {
                  setShowDetailView(true);
                  setIsDrawerOpen(false);
                }}
              >
                {part}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isDrawerOpen && <div className="overlay" onClick={toggleDrawer}></div>}

      <div className="controls">
        {!showDetailView && (
          <>
            <button onClick={handlePlayAnimation} disabled={isPlaying} className="play-button">Play Animation</button>
            <button onClick={handleStopAnimation} disabled={!isPlaying} className="stop-button">Stop Animation</button>
          </>
        )}
        {showDetailView && (
          <button onClick={handleBackClick} className="back-button">Back to Full View</button>
        )}
      </div>

      {!showDetailView ? (
        <div className="model-container">
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
        <div className="split-view">
          <div className="model-container half">
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
          <div className="description-container">
            <ModelDescription />
          </div>
        </div>
      )}
    </div>
  );
}