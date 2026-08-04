import { useState } from "react";
import axios from "axios";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isRegistering
      ? "https://abja-skin-care.onrender.com/api/auth/register"
      : "https://abja-skin-care.onrender.com/api/auth/login";

    axios
      .post(url, { email, password })
      .then((res) => {
        setLoading(false);
        if (isRegistering) {
          alert("Account registered successfully! Please log in.");
          setIsRegistering(false);
          setPassword("");
        } else {
          localStorage.setItem("token", res.data.token);
          onLoginSuccess();
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.error || "Authentication failed. Please try again.");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Luxury Brand Badge */}
        <div style={{ textAlign: "center" }}>
          <span className="auth-brand-badge">✨ Abja Exports & Skincare</span>
          <h1 className="auth-title">🌸 Abja Skin Care</h1>
          <p className="auth-subtitle">
            {isRegistering
              ? "Register a new partner account to access CRM portal"
              : "Portal for Salons, Doctors & Retail Partners"}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${!isRegistering ? "active" : ""}`}
            onClick={() => {
              setIsRegistering(false);
              setError("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${isRegistering ? "active" : ""}`}
            onClick={() => {
              setIsRegistering(true);
              setError("");
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-error-alert" style={{ marginBottom: 18 }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field-group">
            <label>Email Address</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">✉️</span>
              <input
                type="email"
                placeholder="admin@abjacare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon">🔒</span>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <span>⏳ Processing...</span>
            ) : (
              <span>{isRegistering ? "Create Partner Account ✨" : "Sign In to Portal 🚀"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
