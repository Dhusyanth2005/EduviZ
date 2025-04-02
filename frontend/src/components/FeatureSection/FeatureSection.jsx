import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaCubes, FaLaptopCode, FaGraduationCap, FaTools, FaUniversity, FaIndustry } from 'react-icons/fa';
import styles from './Features.module.css';

// Import model-viewer script in a side-effect
const ModelViewerComponent = () => {
  useEffect(() => {
    // Ensure model-viewer is defined and loaded
    if (!customElements.get('model-viewer')) {
      import('@google/model-viewer');
    }
  }, []);

  return (
    <model-viewer
      src="/path/to/your/model.glb" // Replace with your model path
      alt="3D model"
      auto-rotate
      camera-controls
      ar
      shadow-intensity="1"
      environment-image="neutral"
      exposure="0.9"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

const FeatureSection = () => {
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  
  const modelShowcases = [
    {
      id: '1',
      modelSrc: '/public/model/cycle.glb', // Replace with actual model path
      alt: 'Planetary System Model'
    },
    {
      id: '2',
      modelSrc: '/public/model/Astronaut (3).glb', // Replace with actual model path
      alt: 'Molecular Structure Model'
    },
    {
      id: '3',
      modelSrc: '/public/model/micro2.0.glb', // Replace with actual model path
      alt: 'Geological Formation Model'
    },
    {
      id: '4',
      modelSrc: '/public/model/cycle.glb', // Replace with actual model path
      alt: 'Atmospheric Simulation Model'
    }
  ];

  return (
    <section 
      id="features-section"
      className={styles.featuresSection} 
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Immersive 3D Learning</h2>
          <p className={styles.sectionSubtitle}>
            Experience complex concepts through interactive visualization without expensive hardware
          </p>
        </div>
        
        {/* Main feature showcase with model-viewer and description */}
        <div className={styles.featureShowcase}>
          <div className={styles.featureShowcaseContent}>
            <h3 className={styles.featureShowcaseTitle}>Interactive Exploration Engine</h3>
            <p className={styles.featureShowcaseDescription}>
              Our WebGL-powered platform lets you manipulate realistic 3D models with intuitive controls.
              Dismantle complex structures, view cross-sections, and observe real-time simulations to 
              truly understand how systems work at a molecular, mechanical, and computational level.
            </p>
            <ul className={styles.featureShowcaseList}>
              <li>Advanced model manipulation with 6 degrees of freedom</li>
              <li>Real-time functional simulations with accurate physics</li>
              <li>Multi-layer cross-sectional visualization</li>
              <li>Interactive annotations with contextual information</li>
              <li>Progressive learning paths with adaptive difficulty</li>
            </ul>
            <Link to="/" className={styles.btnOutline}>
              Explore EduViz Technology
            </Link>
          </div>
          <div className={styles.featureShowcaseImage}>
            {/* Replacing the static placeholder and canvas with model-viewer via Swiper */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setActiveModelIndex(swiper.activeIndex)}
              className={`${styles.featureSwiper} h-full w-full`}
            >
              {modelShowcases.map((model, index) => (
                <SwiperSlide key={model.id}>
                  <div className={styles.featureImagePlaceholder}>
                    {/* Use model-viewer for each slide */}
                    <model-viewer
                      src={model.modelSrc}
                      alt={model.alt}
                      auto-rotate
                      camera-controls
                      shadow-intensity="1"
                      environment-image="neutral"
                      exposure="0.9"
                      style={{ width: '100%', height: '100%' }}
                    ></model-viewer>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        
        {/* Feature cards grid */}
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaCubes /></div>
            <h3 className={styles.featureTitle}>High-Fidelity 3D Models</h3>
            <p className={styles.featureDescription}>
              Scientifically accurate models with industry-leading detail for astronomy, geology, 
              and atmospheric visualization based on research-grade data.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaLaptopCode /></div>
            <h3 className={styles.featureTitle}>Web-Based Immersion</h3>
            <p className={styles.featureDescription}>
              Experience VR-quality visualization without specialized hardware - our platform delivers
              advanced 3D rendering on any modern web browser with WebGL support.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaGraduationCap /></div>
            <h3 className={styles.featureTitle}>Adaptive Learning Paths</h3>
            <p className={styles.featureDescription}>
              Follow personalized exploration sequences with interactive assessments, challenges, and
              progress tracking built around sophisticated 3D models.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaTools /></div>
            <h3 className={styles.featureTitle}>Domain-Specific Tools</h3>
            <p className={styles.featureDescription}>
              Access specialized interaction tools for different disciplines - from astronomy to
              meteorology to planetary geology visualization.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaUniversity /></div>
            <h3 className={styles.featureTitle}>Research-Grade Education</h3>
            <p className={styles.featureDescription}>
              Designed by educators and domain experts to make complex celestial concepts accessible
              with the same tools used in cutting-edge research labs.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaIndustry /></div>
            <h3 className={styles.featureTitle}>Professional Applications</h3>
            <p className={styles.featureDescription}>
              Beyond education: our platform serves industrial clients with professional-grade visualization
              for satellite tracking, weather modeling, and space exploration.
            </p>
          </div>
        </div>
        
        {/* Features metrics */}
        <div className={styles.featureMetrics}>
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>15,000+</span>
            <span className={styles.metricLabel}>Interactive 3D Models</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>120+</span>
            <span className={styles.metricLabel}>Advanced Simulations</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>99.9%</span>
            <span className={styles.metricLabel}>Browser Compatibility</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricNumber}>4.9/5</span>
            <span className={styles.metricLabel}>Educator Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;