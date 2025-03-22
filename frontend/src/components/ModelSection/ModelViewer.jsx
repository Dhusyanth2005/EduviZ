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
      onLoad(modelViewerRef);
    }
  }, [isPlaying, showDetailView, onLoad]);

  return (
    <model-viewer
      ref={modelViewerRef}
      src={modelSrc}
      camera-controls
      auto-rotate={showDetailView}
      className={styles.modelViewer}
      shadow-intensity="0.8"
      shadow-softness="0.5"
    />
  );
}

export default ModelViewer;