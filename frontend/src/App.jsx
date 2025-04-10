import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ModelPage from './pages/ModelPage/ModelPage.jsx';
import LearnerDashboard from './pages/LearnerDashboard/LearnerDashboard.jsx';
import RoleSelection from './pages/RoleSelection/RoleSelection.jsx';
import LoginPage from './pages/SignUp/LoginPage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboardPage.jsx';
import ModelEnrollPage from './pages/ModelEnrollPage/ModelEnrollPage.jsx';
import { bicycleData } from './bicycleData.js';
import { cpuData } from './cpuData.js';
import { microchipData } from './microChipData.js';


const App = () => {
  // Simple authentication check (replace with real auth logic)
  const isAuthenticated = () => {
    return true;
  };
 
  const marketplaceModels = [
    {
      id: 4,
      title: "Molecular Structure Viewer",
      price: "$29.99",
      imageUrl: "/api/placeholder/400/250",
      description: "Explore complex molecular and atomic structures in this interactive 3D model. Perfect for chemistry students and professionals looking to visualize molecular bonds and structures at the atomic level.",
      category: "Chemistry",
      difficulty: "Advanced",
      isNew: true,
      learningPoints: [
        "Visualize complex molecular structures in 3D",
        "Understand atomic bonding and molecular interactions",
        "Learn about molecular symmetry and geometry",
        "Explore different molecular representations",
        "Study the relationship between structure and function"
      ],
      instructor: "Dr. Emily Chen",
      rating: 4.8,
      reviews: 145,
      lastUpdated: "March 15, 2025"
    },
    {
      id: 5,
      title: "Ecosystem Dynamics",
      price: "$34.99",
      imageUrl: "/api/placeholder/400/250",
      description: "Dive into the complex interactions within ecosystems with this comprehensive 3D model that simulates food webs, energy flow, and population dynamics in various biomes.",
      category: "Biology",
      difficulty: "Intermediate",
      isNew: false,
      learningPoints: [
        "Understand food web interactions and energy transfer",
        "Visualize population dynamics and predator-prey relationships",
        "Explore biodiversity patterns across different ecosystems",
        "Study the impact of environmental changes on ecosystem stability",
        "Learn about keystone species and their ecological importance"
      ],
      instructor: "Dr. Michael Johnson",
      rating: 4.6,
      reviews: 132,
      lastUpdated: "February 28, 2025"
    },
    {
      id: 6,
      title: "Quantum Mechanics Simulator",
      price: "$39.99",
      imageUrl: "/api/placeholder/400/250",
      description: "Experience the fascinating world of quantum mechanics through interactive simulations and visualizations of quantum phenomena, wave functions, and particle behavior.",
      category: "Physics",
      difficulty: "Advanced",
      isNew: true,
      learningPoints: [
        "Visualize quantum wave functions and probability distributions",
        "Understand the double-slit experiment and wave-particle duality",
        "Explore quantum tunneling and barrier penetration",
        "Study quantum superposition and entanglement concepts",
        "Learn about quantum measurement and the observer effect"
      ],
      instructor: "Prof. Sarah Williams",
      rating: 4.9,
      reviews: 178,
      lastUpdated: "March 20, 2025"
    },
    {
      id: 7,
      title: "Planetary Geology Explorer",
      price: "$27.99",
      imageUrl: "/api/placeholder/400/250",
      description: "Tour the geological features of planets and moons in our solar system, comparing formations and understanding the processes that shaped different celestial bodies.",
      category: "Astronomy",
      difficulty: "Intermediate",
      isNew: false,
      learningPoints: [
        "Compare geological features across different planets and moons",
        "Understand tectonic processes on terrestrial planets",
        "Explore volcanic and impact formations throughout the solar system",
        "Study the role of water and ice in shaping planetary surfaces",
        "Learn about the geological history of Earth, Mars, and other worlds"
      ],
      instructor: "Dr. Robert Chen",
      rating: 4.7,
      reviews: 112,
      lastUpdated: "March 5, 2025"
    },
    {
      id: 8,
      title: "Neural Network Visualizer",
      price: "$44.99",
      imageUrl: "/api/placeholder/400/250",
      description: "Step inside a neural network with this advanced 3D model that illustrates how artificial neural networks process information, learn patterns, and make predictions.",
      category: "Computer Science",
      difficulty: "Advanced",
      isNew: true,
      learningPoints: [
        "Visualize neural network architecture and information flow",
        "Understand activation functions and weight adjustments",
        "Explore backpropagation and gradient descent algorithms",
        "Study different network types including CNN, RNN, and transformers",
        "Learn how neural networks recognize patterns and make predictions"
      ],
      instructor: "Prof. David Lee",
      rating: 4.8,
      reviews: 156,
      lastUpdated: "March 18, 2025"
    }
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cycle" element={<ModelPage data={bicycleData} />} /> {/* Changed to data prop */}
        <Route path="/cpu" element={<ModelPage data={cpuData} />} /> {/* Changed to data prop */}
        <Route path="/chip" element={<ModelPage data={microchipData} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/model/:modelId" element={<ModelEnrollPage marketplaceModels={marketplaceModels} />} />
        <Route path='/RoleSelection' element={<RoleSelection />} />
        <Route
          path="/learner"
          element={isAuthenticated() ? <LearnerDashboard marketplaceModels={marketplaceModels}/> : <Navigate to="/login" />}
        />
        <Route path='/instructor' element={<InstructorDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;