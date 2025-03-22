import React, { useState, useCallback } from "react";
import "./RoleSelection.css";

const RoleSelection = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleMouseEnter = useCallback((role) => setHoveredRole(role), []);
  const handleMouseLeave = useCallback(() => setHoveredRole(null), []);

  return (
    <div
      className={`role-selection-page ${
        hoveredRole === "student"
          ? "student-hovered"
          : hoveredRole === "teacher"
          ? "teacher-hovered"
          : ""
      }`}
    >
      <div className="model-background">
        <div className="model-grid" />
      </div>

      <div className="role-selection-overlay" />

      <div className="role-selection-container">
        <div className="logo-container">
          <div className="logo-icon">
            <span>EV</span>
          </div>
          <div className="logo-text">EduViz</div>
        </div>

        <h1 className="selection-title">
          Choose Your <span>Learning</span> Journey
        </h1>
        <p className="selection-subtitle">
          Select your role to personalize your EduViz experience
        </p>

        <div className="roles-container">
          <div
            className={`role-card ${
              hoveredRole === "student" ? "hovered" : ""
            }`}
            onMouseEnter={() => handleMouseEnter("student")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="role-icon">👨‍🎓</div>
            <h2 className="role-title">Student</h2>
            <p className="role-description">
              Access courses, track your progress, and engage with interactive
              learning materials.
            </p>
            <ul className="role-features">
              <li>Personalized learning paths</li>
              <li>Progress tracking dashboard</li>
              <li>Connect with peers</li>
            </ul>
            <button className="role-button student">
              <span>Continue as Student</span>
              <span className="button-arrow">→</span>
            </button>
          </div>

          <div
            className={`role-card ${
              hoveredRole === "teacher" ? "hovered" : ""
            }`}
            onMouseEnter={() => handleMouseEnter("teacher")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="role-icon">👩‍🏫</div>
            <h2 className="role-title">Teacher</h2>
            <p className="role-description">
              Create courses, manage classrooms, and track student performance.
            </p>
            <ul className="role-features">
              <li>Course creation tools</li>
              <li>Student analytics dashboard</li>
              <li>Assessment generator</li>
            </ul>
            <button className="role-button teacher">
              <span>Continue as Teacher</span>
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>

        <div className="help-text">
          Not sure which role to choose? <a href="#">Learn more about roles</a>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
