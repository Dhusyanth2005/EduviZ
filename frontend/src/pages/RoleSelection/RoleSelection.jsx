import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

const RoleSelection = () => {
  const canvasRef = useRef(null);
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleMouseEnter = useCallback((role) => setHoveredRole(role), []);
  const handleMouseLeave = useCallback(() => setHoveredRole(null), []);
  const navigate = useNavigate();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const connections = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: 0.6 + Math.random() * 0.3,
      });
    }

    // Initialize connections
    for (let i = 0; i < 20; i++) {
      const startIndex = Math.floor(Math.random() * particles.length);
      const endIndex = Math.floor(Math.random() * particles.length);
      connections.push({
        start: startIndex,
        end: endIndex,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach((connection) => {
        const start = particles[connection.start];
        const end = particles[connection.end];
        const gradient = ctx.createLinearGradient(
          start.x,
          start.y,
          end.x,
          end.y
        );
        gradient.addColorStop(0, `rgba(123, 44, 191, ${connection.opacity})`); // Matches --primary
        gradient.addColorStop(1, "rgba(123, 44, 191, 0)");
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw and update particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123, 44, 191, ${particle.opacity})`; // Matches --primary
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="RoleSection">
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
        <canvas ref={canvasRef} className="particles-canvas"></canvas>
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
          Select your role to personalized your EduViz experience
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
            <button className="role-button student" onClick={()=>navigate("/dashboard")}>
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
            <button className="role-button teacher" onClick={()=>navigate('/instructor')}>
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
    </div>
  );
};

export default RoleSelection;