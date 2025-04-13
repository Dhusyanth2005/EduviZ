import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ModelPage from './pages/ModelPage/ModelPage.jsx';
import LearnerDashboard from './pages/LearnerDashboard/LearnerDashboard.jsx';
import RoleSelection from './pages/RoleSelection/RoleSelection.jsx';
import LoginPage from './pages/SignUp/LoginPage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboardPage.jsx';
import LearningPage from './pages/LearningPage/LearningPage.jsx';
import ModelEnrollPage from './pages/ModelEnrollPage/ModelEnrollPage.jsx';
import { bicycleData } from './bicycleData.js';
import { cpuData } from './cpuData.js';
import { microchipData } from './microChipData.js';


const App = () => {
  // Simple authentication check (replace with real auth logic)
  const isAuthenticated = () => {
    return true;
  };
 
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/67f8b849583ccf2cab61ae9f" element={<ModelPage data={bicycleData} />} /> {/* Changed to data prop */}
        <Route path="/cpu" element={<ModelPage data={cpuData} />} /> {/* Changed to data prop */}
        <Route path="/67fb3aaf2ec2684bef9777d7" element={<ModelPage data={microchipData} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/model/:modelId" element={<ModelEnrollPage/>} />
        <Route path="/learning/:modelId" element={<LearningPage />} />
        <Route path='/RoleSelection' element={<RoleSelection />} />
        <Route
          path="/learner"
          element={isAuthenticated() ? <LearnerDashboard/> : <Navigate to="/login" />}
        />
        <Route path='/instructor' element={<InstructorDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;