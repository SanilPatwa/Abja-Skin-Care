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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const url = isRegistering
      ? "https://abja-skin-care.onrender.com/api/auth/register"
      : "https://abja-skin-care.onrender.com/api/auth/login";

    axios
      .post(url, { email, password })
      .then((res) => {
        if (isRegistering) {
          alert("Account registered! Please log in.");
          setIsRegistering(false);
        } else {
          localStorage.setItem("token", res.data.token);
          onLoginSuccess();
        }
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Authentication failed");
      });
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, textAlign: "center" }}>
      <h2>{isRegistering ? "Create Account" : "Welcome Back"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, cursor: "pointer" }}>
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 15 }}>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError("");
          }}
          style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
        >
          {isRegistering ? "Login here" : "Sign up here"}
        </button>
      </p>
    </div>
  );
};

export default Login;
