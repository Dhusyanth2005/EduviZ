import { useEffect, useRef } from "react";
import "@google/model-viewer";
import styles from './ModelViewer.module.css';

function ModelViewer({ modelSrc, isPlaying, showDetailView, onLoad }) {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    if (modelViewerRef.current) {
      if (isPlaying) {
        modelViewerRef.current.play();
      } else {
        modelViewerRef.current.pause();
      }
      
      // Set much larger max camera orbit distance (300% of model size)
      modelViewerRef.current.maxCameraOrbit = "auto auto 300%";
      
      // Initialize with a moderate distance
      modelViewerRef.current.cameraOrbit = "0deg 75deg 100%";
      
      onLoad(modelViewerRef);
    }
  }, [isPlaying, showDetailView, onLoad]);

  // Add wheel listener for enhanced zoom functionality
  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleWheel = (event) => {
      if (event.deltaY > 0) { // Scrolling down/away (zoom out)
        const orbitValues = viewer.getCameraOrbit();
        // Allow zooming out much further than default
        const newRadius = Math.min(orbitValues.radius * 1.2, orbitValues.radius + 5);
        viewer.cameraOrbit = `${orbitValues.theta}rad ${orbitValues.phi}rad ${newRadius}m`;
      }
    };

    viewer.addEventListener('wheel', handleWheel);
    return () => viewer.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <model-viewer
      ref={modelViewerRef}
      src={modelSrc}
      camera-controls
      auto-rotate={showDetailView}
      className={styles.modelViewer}
      shadow-intensity="0.8"
      shadow-softness="0.5"
      min-camera-orbit="auto auto 50%"
      max-camera-orbit="auto auto 300%"
      interpolation-decay="100"
    />
  );
}

export default ModelViewer;