import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css"; // Reusing the same CSS

const LoginPage = () => {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
        const gradient = ctx.createLinearGradient(
          start.x,
          start.y,
          end.x,
          end.y
        );
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

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
    if (!apiUrl) {
      console.error("API URL is not configured");
      alert("Configuration error. Please try again later.");
      return;
    }

    try {
      console.log("Initiating Google login with URL:", `${apiUrl}/auth/google`);
      window.location.href = `${apiUrl}/auth/google`;
    } catch (error) {
      console.error("Error initiating Google login:", error);
      alert("Failed to initiate Google login. Please try again.");
    }
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
                  <div className={styles.logoIcon}>
                    <span>EV</span>
                  </div>
                  EduViz
                </div>
                <h1 className={styles.signupHeadline}>
                  Welcome Back to <span>EduViz</span>
                </h1>
                <p className={styles.signupSubtext}>
                  Sign in to continue your learning journey with EduViz!
                </p>
              </div>

              <div className={styles.signupFormContainer}>
                <div className={styles.formDecoration + " " + styles.formDecoration1} />
                <div className={styles.formDecoration + " " + styles.formDecoration2} />
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Sign In to EduViz</h2>
                  <p className={styles.formSubtitle}>Welcome back! Please sign in</p>
                </div>
                <form className={styles.signupForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={styles.formControl}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      className={styles.formControl}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                  </div>
                  <button type="submit" className={styles.signupButton}>
                    <span>Sign In</span>
                  </button>
                  <div className={styles.orDivider}>
                    <div className={styles.dividerLine} />
                    <span className={styles.dividerText}>OR</span>
                    <div className={styles.dividerLine} />
                  </div>
                  <div className={styles.socialLogin}>
                    <button
                      type="button"
                      className={styles.socialButton}
                      onClick={handleGoogleLogin}
                    >
                      <span className={styles.socialIcon}>G</span>
                    </button>
                    <button type="button" className={styles.socialButton}>
                      <span className={styles.socialIcon}>f</span>
                    </button>
                    <button type="button" className={styles.socialButton}>
                      <span className={styles.socialIcon}>in</span>
                    </button>
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