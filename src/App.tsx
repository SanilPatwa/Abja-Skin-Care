import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import Visits from "./Pages/Visits";
import Samples from "./Pages/Samples";

const App = () => {
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
