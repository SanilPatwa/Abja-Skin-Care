import { useState } from "react";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import Visits from "./Pages/Visits";
import Samples from "./Pages/Samples";
import Login from "./Pages/Login";

const App = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  if (!token) {
    return <Login onLoginSuccess={() => setToken(localStorage.getItem("token"))} />;
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
