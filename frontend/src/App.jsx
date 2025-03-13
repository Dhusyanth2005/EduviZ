import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ModelPage from './pages/ModelPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import DashboardPage from './pages/DashBoardPage.jsx'; // Import DashboardPage component

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;