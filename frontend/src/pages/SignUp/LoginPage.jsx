import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import axios from 'axios';

const LoginPage = () => {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Particle animation code (unchanged)
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

      connections.forEach((connection) => {
        const start = particles[connection.start];
        const end = particles[connection.end];
        const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        gradient.addColorStop(0, `rgba(174, 109, 242, ${connection.opacity})`);
        gradient.addColorStop(1, "rgba(174, 109, 242, 0)");
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(174, 109, 242, ${particle.opacity})`;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true }); // Include cookies for session

      setMessage('Logged in successfully!');
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
    if (!apiUrl) {
      console.error("API URL is not configured");
      alert("Configuration error. Please try again later.");
      return;
    }
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className={styles.signupRoot}>
      <div className={styles.signupPage}>
        <div className={styles.signupContainer}>
          <div className={styles.modelBackground}>
            <canvas ref={canvasRef} className={styles.particlesCanvas}></canvas>
            <div className={styles.modelGrid}></div>
          </div>
          <div className={styles.signupOverlay} />
          <div className={styles.signupContentWrapper}>
            <div className={styles.signupContent}>
              <div className={styles.signupInfo}>
                <div className={styles.signupLogo}>
                  <div className={styles.logoIcon}><span>EV</span></div>
                  EduViz
                </div>
                <h1 className={styles.signupHeadline}>
                  Welcome Back to <span>EduViz</span>
                </h1>
                <p className={styles.signupSubtext}>
                  Sign in to continue your learning journey!
                </p>
              </div>
              <div className={styles.signupFormContainer}>
                <div className={styles.formDecoration + " " + styles.formDecoration1} />
                <div className={styles.formDecoration + " " + styles.formDecoration2} />
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Sign In to EduViz</h2>
                  <p className={styles.formSubtitle}>Welcome back! Please sign in</p>
                </div>
                <form className={styles.signupForm} onSubmit={handleLogin}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      className={styles.formControl}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={styles.formControl}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button type="submit" className={styles.signupButton} disabled={loading}>
                    <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                  </button>
                  {message && <div className={styles.successMessage}>{message}</div>}
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  <div className={styles.orDivider}>
                    <div className={styles.dividerLine} /><span className={styles.dividerText}>OR</span><div className={styles.dividerLine} />
                  </div>
                  <div className={styles.socialLogin}>
                    <button type="button" className={styles.socialButton} onClick={handleGoogleLogin}>
                      <span className={styles.socialIcon}>G</span>
                    </button>
                    {/* Other social buttons unchanged */}
                  </div>
                  <div className={styles.signinLink}>
                    Don’t have an account? <a href="/signup">Sign up</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;