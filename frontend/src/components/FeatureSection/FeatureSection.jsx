import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCubes, FaLaptopCode, FaGraduationCap, FaTools, FaUniversity, FaIndustry } from 'react-icons/fa';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './Features.module.css';

const FeatureSection = ({ featuresRef }) => {
  const canvasRef = useRef(null);
  
  // 3D animation setup
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 4/3, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setClearColor(0x000510, 1);
    
    // OrbitControls for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.minDistance = 15;
    controls.maxDistance = 60;
    controls.enablePan = false;
    
    // Advanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x111122, 0.2);
    scene.add(ambientLight);
    
    // Sun directional light
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(50, 30, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 500;
    sunLight.shadow.camera.left = -100;
    sunLight.shadow.camera.right = 100;
    sunLight.shadow.camera.top = 100;
    sunLight.shadow.camera.bottom = -100;
    scene.add(sunLight);
    
    // Subtle blue rim light for atmosphere effect
    const rimLight = new THREE.DirectionalLight(0x3a7ca5, 0.8);
    rimLight.position.set(-30, 0, -30);
    scene.add(rimLight);
    
    // Create universe background
    const createUniverse = () => {
      // Stars
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      const starsVertices = [];
      for (let i = 0; i < 10000; i++) {
        // Create a sphere of stars
        const radius = 500 + Math.random() * 1000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        starsVertices.push(x, y, z);
      }
      
      starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
      const starPoints = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starPoints);
      
      // Create several nebulae with different colors
      const createNebula = (color, size, position) => {
        const nebulaGeometry = new THREE.IcosahedronGeometry(size, 4);
        const nebulaMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.08,
          wireframe: true,
          blending: THREE.AdditiveBlending
        });
        const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        nebula.position.set(position.x, position.y, position.z);
        scene.add(nebula);
        
        // Add a subtle glow effect
        const glowGeometry = new THREE.IcosahedronGeometry(size * 1.1, 4);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.03,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        nebula.add(glow);
        
        return nebula;
      };
      
      // Create multiple nebulae with different colors and positions
      const nebulae = [
        createNebula(0x5050ff, 80, new THREE.Vector3(-150, 100, -300)),
        createNebula(0xff5050, 100, new THREE.Vector3(300, -50, -200)),
        createNebula(0x50ff80, 120, new THREE.Vector3(-250, -150, -400)),
        createNebula(0xaa50ff, 90, new THREE.Vector3(200, 200, -350))
      ];
      
      // Dust particles for extra depth
      const dustParticles = [];
      const dustGroup = new THREE.Group();
      const dustCount = 300;
      
      for (let i = 0; i < dustCount; i++) {
        const size = 0.2 + Math.random() * 1.0;
        const distance = 30 + Math.random() * 40;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        const dustGeometry = new THREE.SphereGeometry(size, 8, 8);
        const dustColor = new THREE.Color();
        dustColor.setHSL(Math.random(), 0.3, 0.7);
        
        const dustMaterial = new THREE.MeshBasicMaterial({
          color: dustColor,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending
        });
        
        const dust = new THREE.Mesh(dustGeometry, dustMaterial);
        
        const x = distance * Math.sin(phi) * Math.cos(theta);
        const y = distance * Math.sin(phi) * Math.sin(theta);
        const z = distance * Math.cos(phi);
        
        dust.position.set(x, y, z);
        dust.userData = {
          originalPosition: new THREE.Vector3(x, y, z),
          speed: 0.001 + Math.random() * 0.003,
          offset: Math.random() * Math.PI * 2
        };
        
        dustGroup.add(dust);
        dustParticles.push(dust);
      }
      
      scene.add(dustGroup);
      return { nebulae, dustParticles };
    };
    
    // Create Earth
    const createEarth = () => {
      const earthGroup = new THREE.Group();
      
      // Load Earth textures
      const textureLoader = new THREE.TextureLoader();
      
      // Create Earth sphere with high detail
      const earthGeometry = new THREE.SphereGeometry(8, 64, 64);
      
      // Earth materials with rich details
const earthMaterial = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'),
    bumpMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'),
    bumpScale: 0.2,
    specularMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'),
    normalMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'),
    normalScale: new THREE.Vector2(0.8, 0.8),
    roughness: 0.65,
    metalness: 0.1,
    clearcoat: 0.2,
    clearcoatRoughness: 0.3
  });
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earth.receiveShadow = true;
      earth.castShadow = true;
      earth.rotation.y = Math.PI * 1.5;
      earthGroup.add(earth);
      
      // Create atmospheric glow
      const atmosphereGeometry = new THREE.SphereGeometry(8.2, 64, 64);
      const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x4ca6ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      earthGroup.add(atmosphere);
      
      // Add a stronger outer glow
      const glowGeometry = new THREE.SphereGeometry(8.3, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          c: { value: 0.1 },
          p: { value: 6 },
          glowColor: { value: new THREE.Color(0x0077ff) },
          viewVector: { value: new THREE.Vector3() }
        },
        vertexShader: `
          uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize(normal);
            vec3 vNormel = normalize(viewVector);
            intensity = pow(c - dot(vNormal, vNormel), p);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, 1.0);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      earthGroup.add(glow);
      
      // Create cloud layer
      const cloudGeometry = new THREE.SphereGeometry(8.25, 64, 64);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'),
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      
      const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
      earthGroup.add(clouds);
      
      // Add city lights texture for night side
      const cityLightsGeometry = new THREE.SphereGeometry(8.05, 64, 64);
      const cityLightsMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.jpg'),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.4
      });
      
      
      const cityLights = new THREE.Mesh(cityLightsGeometry, cityLightsMaterial);
      earthGroup.add(cityLights);
      
      // Create moon
      const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
      // Moon material
const moonMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg'),
    bumpMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg'),
    bumpScale: 0.1,
    roughness: 0.8
  });
      
      const moon = new THREE.Mesh(moonGeometry, moonMaterial);
      moon.position.set(20, 5, 20);
      moon.castShadow = true;
      earthGroup.add(moon);
      
      // Create satellite ring
      const createSatellites = () => {
        const satelliteGroup = new THREE.Group();
        const orbitRadius = 10.5;
        const orbitTilt = 0.3;
        const satelliteCount = 12;
        
        // Orbit visualizer
        const orbitGeometry = new THREE.TorusGeometry(orbitRadius, 0.015, 8, 128);
        const orbitMaterial = new THREE.MeshBasicMaterial({
          color: 0x3399ff,
          transparent: true,
          opacity: 0.3
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2 + orbitTilt;
        satelliteGroup.add(orbit);
        
        // Satellites
        const satellites = [];
        for (let i = 0; i < satelliteCount; i++) {
          const angle = (i / satelliteCount) * Math.PI * 2;
          
          // Satellite body
          const satGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.4);
          const satMaterial = new THREE.MeshPhongMaterial({
            color: 0xcccccc,
            specular: 0x333333,
            shininess: 80
          });
          
          const satellite = new THREE.Group();
          const satBody = new THREE.Mesh(satGeometry, satMaterial);
          satellite.add(satBody);
          
          // Solar panels
          const panelGeometry = new THREE.BoxGeometry(1, 0.6, 0.01);
          const panelMaterial = new THREE.MeshPhongMaterial({
            color: 0x3377aa,
            specular: 0x333333,
            shininess: 90,
            emissive: 0x112244
          });
          
          const panelLeft = new THREE.Mesh(panelGeometry, panelMaterial);
          panelLeft.position.set(-0.6, 0, 0);
          satellite.add(panelLeft);
          
          const panelRight = new THREE.Mesh(panelGeometry, panelMaterial);
          panelRight.position.set(0.6, 0, 0);
          satellite.add(panelRight);
          
          // Position on orbit
          const x = Math.cos(angle) * orbitRadius;
          const z = Math.sin(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius * Math.sin(orbitTilt);
          
          satellite.position.set(x, y, z);
          satellite.lookAt(0, 0, 0);
          satellite.userData = {
            orbitAngle: angle,
            orbitSpeed: 0.001 + Math.random() * 0.002,
            blinkTime: Math.random() * 5
          };
          
          // Add signal beams occasionally
          if (i % 3 === 0) {
            const beamGeometry = new THREE.CylinderGeometry(0.01, 0.05, 4, 8);
            const beamMaterial = new THREE.MeshBasicMaterial({
              color: 0x00ffff,
              transparent: true,
              opacity: 0.3,
              blending: THREE.AdditiveBlending
            });
            
            const beam = new THREE.Mesh(beamGeometry, beamMaterial);
            beam.rotation.x = Math.PI / 2;
            beam.position.z = -2;
            satellite.add(beam);
          }
          
          satelliteGroup.add(satellite);
          satellites.push(satellite);
        }
        
        satelliteGroup.userData = { satellites };
        return satelliteGroup;
      };
      
      const satellites = createSatellites();
      earthGroup.add(satellites);
      
      // Create auroras at the poles
      const createAurora = (isNorth) => {
        const auroraGroup = new THREE.Group();
        const radius = 8.4;
        const height = 0.8;
        const segments = 128;
        const color = isNorth ? 0x00ff88 : 0x7788ff;
        
        // Create aurora base ring
        const ringGeometry = new THREE.TorusGeometry(radius * 0.25, 0.1, 8, segments);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = isNorth ? radius * 0.9 : -radius * 0.9;
        auroraGroup.add(ring);
        
        // Create aurora curtain
        const curtainPoints = [];
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const x = Math.cos(angle) * radius * 0.25;
          const z = Math.sin(angle) * radius * 0.25;
          
          // Base point on ring
          curtainPoints.push(new THREE.Vector3(x, 0, z));
          
          // Wavy top point
          const waveHeight = height * (0.8 + Math.sin(angle * 6) * 0.2);
          curtainPoints.push(new THREE.Vector3(x, -waveHeight, z));
        }
        
        for (let i = 0; i < segments; i++) {
          const idx1 = i * 2;
          const idx2 = idx1 + 1;
          const idx3 = (idx1 + 2) % (segments * 2 + 2);
          const idx4 = (idx1 + 3) % (segments * 2 + 2);
          
          const geometry = new THREE.BufferGeometry();
          const vertices = new Float32Array([
            curtainPoints[idx1].x, curtainPoints[idx1].y, curtainPoints[idx1].z,
            curtainPoints[idx2].x, curtainPoints[idx2].y, curtainPoints[idx2].z,
            curtainPoints[idx3].x, curtainPoints[idx3].y, curtainPoints[idx3].z,
            
            curtainPoints[idx2].x, curtainPoints[idx2].y, curtainPoints[idx2].z,
            curtainPoints[idx4].x, curtainPoints[idx4].y, curtainPoints[idx4].z,
            curtainPoints[idx3].x, curtainPoints[idx3].y, curtainPoints[idx3].z
          ]);
          
          geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
          
          const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
          });
          
          const curtainPiece = new THREE.Mesh(geometry, material);
          curtainPiece.userData = {
            initialOpacity: 0.3,
            opacityFactor: Math.random()
          };
          
          auroraGroup.add(curtainPiece);
        }
        
        auroraGroup.position.y = isNorth ? radius * 0.9 : -radius * 0.9;
        return auroraGroup;
      };
      
      const northAurora = createAurora(true);
      const southAurora = createAurora(false);
      earthGroup.add(northAurora);
      earthGroup.add(southAurora);
      
      // Add some atmospheric particles
      const particleCount = 100;
      const particles = [];
      
      const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xaaccff,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      
      for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
        
        // Random position on sphere surface
        const radius = 8.4 + Math.random() * 0.4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        particle.position.set(x, y, z);
        particle.userData = {
          baseRadius: radius,
          theta: theta,
          phi: phi,
          speed: 0.001 + Math.random() * 0.003,
          pulseFactor: Math.random()
        };
        
        earthGroup.add(particle);
        particles.push(particle);
      }
      
      earthGroup.userData = {
        earth,
        clouds,
        moon,
        satellites: satellites.userData.satellites,
        particles,
        northAurora,
        southAurora
      };
      
      return earthGroup;
    };
    
    // Create sun off to the side
    const createSun = () => {
        const sunGeometry = new THREE.SphereGeometry(15, 64, 64);
        
        // Sun main material - more vibrant and emissive
        const sunMaterial = new THREE.MeshBasicMaterial({
          color: 0xffdd77,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending
        });
        
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.position.set(80, 40, 100);
        
        // Inner glow - subtle and close to surface
        const innerGlowGeometry = new THREE.SphereGeometry(16, 32, 32);
        const innerGlowMaterial = new THREE.MeshBasicMaterial({
          color: 0xffcc66,
          transparent: true,
          opacity: 0.3,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        });
        
        const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
        sun.add(innerGlow);
        
        // Mid glow - main corona effect
        const midGlowGeometry = new THREE.SphereGeometry(20, 32, 32);
        const midGlowMaterial = new THREE.ShaderMaterial({
          uniforms: {
            glowColor: { value: new THREE.Color(0xffaa44) },
            viewVector: { value: new THREE.Vector3() }
          },
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 glowColor;
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(glowColor, intensity * 0.4);
            }
          `,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        });
        
        const midGlow = new THREE.Mesh(midGlowGeometry, midGlowMaterial);
        sun.add(midGlow);
        
        // Outer glow - very subtle and large
        const outerGlowGeometry = new THREE.SphereGeometry(30, 32, 32);
        const outerGlowMaterial = new THREE.MeshBasicMaterial({
          color: 0xffaa44,
          transparent: true,
          opacity: 0.15,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        });
        
        const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
        sun.add(outerGlow);
        
        // Solar flares - more controlled
        const flareCount = 6;
        const flares = [];
        
        for (let i = 0; i < flareCount; i++) {
          const size = 2 + Math.random() * 5;
          const flareGeometry = new THREE.SphereGeometry(size, 16, 16);
          const flareMaterial = new THREE.MeshBasicMaterial({
            color: 0xffcc44,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
          });
          
          const flare = new THREE.Mesh(flareGeometry, flareMaterial);
          
          // Position flares more evenly around the sun
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          
          const x = 15 * Math.sin(phi) * Math.cos(theta);
          const y = 15 * Math.sin(phi) * Math.sin(theta);
          const z = 15 * Math.cos(phi);
          
          flare.position.set(x, y, z);
          flare.userData = {
            originalRadius: size,
            pulseFactor: Math.random(),
            pulseSpeed: 0.02 + Math.random() * 0.05
          };
          
          sun.add(flare);
          flares.push(flare);
        }
        
        // Lens flare effect - more subtle
        const lensFlareGeometry = new THREE.PlaneGeometry(40, 40);
        const lensFlareTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
        const lensFlareMaterial = new THREE.MeshBasicMaterial({
          map: lensFlareTexture,
          transparent: true,
          opacity: 0.3,
          depthTest: false,
          blending: THREE.AdditiveBlending
        });
        
        const lensFlare = new THREE.Mesh(lensFlareGeometry, lensFlareMaterial);
        lensFlare.position.set(60, 30, 80);
        lensFlare.lookAt(camera.position);
        
        sun.userData = { flares, lensFlare };
        
        return { sun, lensFlare };
      };
    
    // Create and add space elements
    const universe = createUniverse();
    const earthGroup = createEarth();
    const { sun, lensFlare } = createSun();
    
    // Add all to scene
    scene.add(earthGroup);
    scene.add(sun);
    scene.add(lensFlare);
    
    // Position camera for best view
    camera.position.set(0, 10, 30);
    controls.update();
    
    // Animation variables
    let time = 0;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.005;
      
      // Earth rotation
      earthGroup.rotation.y = time * 0.1;
      
      // Clouds rotation (slightly faster than Earth)
      const earth = earthGroup.userData;
      earth.clouds.rotation.y = time * 0.12;
      
      // Moon orbit
      earth.moon.position.x = Math.cos(time * 0.2) * 20;
      earth.moon.position.z = Math.sin(time * 0.2) * 20;
      earth.moon.rotation.y = time * 0.05;
      
      // Satellite animation
      earth.satellites.forEach(satellite => {
        satellite.userData.orbitAngle += satellite.userData.orbitSpeed;
        
        const angle = satellite.userData.orbitAngle;
        const radius = 10.5;
        const tilt = 0.3;
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle) * radius * Math.sin(tilt);
        
        satellite.position.set(x, y, z);
        satellite.lookAt(0, 0, 0);
        
        // Blinking lights on satellites
        satellite.userData.blinkTime -= 0.01;
        if (satellite.userData.blinkTime <= 0) {
          satellite.userData.blinkTime = 4 + Math.random() * 5;
          
          // Create a brief flash
          const flashGeometry = new THREE.SphereGeometry(0.1, 8, 8);
          const flashMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
          });
          
          const flash = new THREE.Mesh(flashGeometry, flashMaterial);
          flash.scale.set(1, 1, 1);
          flash.position.z = -0.2;
          satellite.add(flash);
          
          // Animate the flash
          const expandAndFade = () => {
            flash.scale.multiplyScalar(1.2);
            flash.material.opacity *= 0.8;
            
            if (flash.material.opacity > 0.1) {
              setTimeout(expandAndFade, 30);
            } else {
              satellite.remove(flash);
            }
          };
          
          expandAndFade();
        }
      });
      
      // Animate atmosphere particles
      earth.particles.forEach(particle => {
        particle.userData.theta += particle.userData.speed;
        
        const radius = particle.userData.baseRadius + Math.sin(time * 0.5 + particle.userData.pulseFactor * 10) * 0.1;
        const theta = particle.userData.theta;
        const phi = particle.userData.phi;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        particle.position.set(x, y, z);
      });
      
      // Animate auroras
      earth.northAurora.children.forEach(child => {
        if (child.material) {
          child.material.opacity = child.userData.initialOpacity * (0.8 + Math.sin(time * 2 + child.userData.opacityFactor * 10) * 0.2);
        }
      });
      
      earth.southAurora.children.forEach(child => {
        if (child.material) {
          child.material.opacity = child.userData.initialOpacity * (0.8 + Math.sin(time * 2 + child.userData.opacityFactor * 10) * 0.2);
        }
      });
      
      // Animate sun flares
      sun.userData.flares.forEach(flare => {
        const pulse = Math.sin(time * flare.userData.pulseSpeed + flare.userData.pulseFactor * 10);
        const scale = flare.userData.originalRadius * (1 + pulse * 0.2);
        flare.scale.set(scale, scale, scale);
        flare.material.opacity = 0.3 + pulse * 0.1;
      });
      
      // Animate dust particles
      universe.dustParticles.forEach(dust => {
        const offset = dust.userData.offset;
        const speed = dust.userData.speed;
        const originalPos = dust.userData.originalPosition;
        
        dust.position.x = originalPos.x + Math.sin(time * speed + offset) * 5;
        dust.position.y = originalPos.y + Math.cos(time * speed * 0.7 + offset) * 5;
        dust.position.z = originalPos.z + Math.sin(time * speed * 1.3 + offset) * 5;
      });
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);
  
  return (
    <section 
      id="features-section"
      className={styles.featuresSection} 
      ref={featuresRef}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Immersive 3D Learning</h2>
          <p className={styles.sectionSubtitle}>
            Experience complex concepts through interactive visualization without expensive hardware
          </p>
        </div>
        
        {/* Main feature showcase with 3D model and description */}
        <div className={styles.featureShowcase}>
        <div className={styles.featureShowcaseContent}>
            <h3 className={styles.featureShowcaseTitle}>Interactive Exploration Engine</h3>
            <p className={styles.featureShowcaseDescription}>
              Our WebGL-powered platform lets you manipulate realistic 3D models with intuitive controls.
              Dismantle complex structures, view cross-sections, and observe real-time cross-sections, and observe real-time simulations to 
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
            <div className={styles.featureImagePlaceholder}>
              <canvas ref={canvasRef} className={styles.canvas3d} />
            </div>
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