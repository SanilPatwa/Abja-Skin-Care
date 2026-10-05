import { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import Visits from "./Pages/Visits";
import Samples from "./Pages/Samples";
import Login from "./Pages/Login";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  // Auto-logout when token is expired or rejected by the server
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          setToken(null);
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token"));
  };

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="visits" element={<Visits />} />
          <Route path="samples" element={<Samples />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
