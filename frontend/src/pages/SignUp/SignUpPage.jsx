import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import axios from 'axios';

const SignUpPage = () => {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    termsAgree: false,
  });
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }
    if (!formData.termsAgree) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/send-otp`, {
        email: formData.email,
      });
      setMessage('OTP sent successfully! Please check your email.');
      setShowOtpInput(true);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Verify OTP
      await axios.post(`${import.meta.env.VITE_API_URL}/api/verify-otp`, {
        email: formData.email,
        otp,
      });

      // Register user after OTP verification
      const signupResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      setMessage('Account created successfully!');
      setTimeout(() => {
        navigate("/RoleSelection");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to verify OTP or signup');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
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
                  Join <span>EduViz</span> and Elevate Your Learning
                </h1>
                <p className={styles.signupSubtext}>
                  Access high-quality courses, interactive content, and expert guidance.
                </p>
                <div className={styles.signupFeatures}>
                  <div className={styles.featurePoint}>
                    <div className={styles.featurePointIcon}>
                      <span>📚</span>
                    </div>
                    <div className={styles.featurePointText}>
                      <h3 className={styles.featurePointTitle}>
                        Unlimited Course Access
                      </h3>
                      <p className={styles.featurePointDescription}>
                        Get access to a variety of courses in different domains.
                      </p>
                    </div>
                  </div>
                  <div className={styles.featurePoint}>
                    <div className={styles.featurePointIcon}>
                      <span>🎯</span>
                    </div>
                    <div className={styles.featurePointText}>
                      <h3 className={styles.featurePointTitle}>
                        Personalized Learning Paths
                      </h3>
                      <p className={styles.featurePointDescription}>
                        Customize your learning experience with AI-driven
                        recommendations.
                      </p>
                    </div>
                  </div>
                  <div className={styles.featurePoint}>
                    <div className={styles.featurePointIcon}>
                      <span>💼</span>
                    </div>
                    <div className={styles.featurePointText}>
                      <h3 className={styles.featurePointTitle}>
                        Career-Oriented Training
                      </h3>
                      <p className={styles.featurePointDescription}>
                        Gain skills that help you land jobs and internships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.signupFormContainer}>
                <div className={`${styles.formDecoration} ${styles.formDecoration1}`} />
                <div className={`${styles.formDecoration} ${styles.formDecoration2}`} />
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Create Your EduViz Account</h2>
                  <p className={styles.formSubtitle}>Start learning today</p>
                </div>
                {!showOtpInput ? (
                  <form className={styles.signupForm} onSubmit={handleSendOTP}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        className={styles.formControl}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
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
                        placeholder="Create a strong password"
                        required
                      />
                    </div>
                    <div className={styles.formCheckbox}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        id="termsAgree"
                        name="termsAgree"
                        checked={formData.termsAgree}
                        onChange={handleInputChange}
                        required
                      />
                      <label className={styles.checkboxLabel} htmlFor="termsAgree">
                        I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                      </label>
                    </div>
                    <button type="submit" className={styles.signupButton} disabled={loading}>
                      <span>{loading ? 'Sending OTP...' : 'Send OTP'}</span>
                    </button>
                    {message && <div className={styles.successMessage}>{message}</div>}
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <div className={styles.orDivider}>
                      <div className={styles.dividerLine} /><span className={styles.dividerText}>OR</span><div className={styles.dividerLine} />
                    </div>
                    <div className={styles.socialLogin}>
                      <button type="button" className={styles.socialButton} onClick={handleGoogleSignUp}>
                        <span className={styles.socialIcon}>G</span>
                      </button>
                      <button type="button" className={styles.socialButton}>
                      <span className={styles.socialIcon}>in</span>
                      </button>
                    </div>
                    <div className={styles.signinLink}>
                      Already have an account? <a href="/login">Sign in</a>
                    </div>
                  </form>
                ) : (
                  <form className={styles.signupForm} onSubmit={handleVerifyOTP}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="otp">Enter Verification Code</label>
                      <input
                        type="text"
                        className={styles.formControl}
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter the code sent to your email"
                        required
                      />
                    </div>
                    <button type="submit" className={styles.signupButton} disabled={loading}>
                      <span>{loading ? 'Verifying...' : 'Verify OTP'}</span>
                    </button>
                    {message && <div className={styles.successMessage}>{message}</div>}
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <div className={styles.signinLink}>
                      <button
                        type="button"
                        onClick={() => { setShowOtpInput(false); setOtp(''); setMessage(''); setError(''); }}
                        className={styles.backButton}
                      >
                        Back to Sign Up
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;