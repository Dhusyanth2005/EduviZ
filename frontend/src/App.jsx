import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import ModelPage from './pages/ModelPage/ModelPage.jsx';


import LearnerDashboard from './pages/LearnerDashboard/LearnerDashboard.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import RoleSelection from './pages/RoleSelection/RoleSelection.jsx';

const App = () => {
  // Simple authentication check (replace with real auth logic)
  const isAuthenticated = () => {
    // For now, assume user is not authenticated unless implemented
    return true; // Change to true or add real auth logic (e.g., check token in localStorage)
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/model" element={<ModelPage />} />
        <Route path="/login" element={<SignUp/>} />
        <Route path='/RoleSelection' element={<RoleSelection />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <LearnerDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;