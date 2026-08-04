import { NavLink, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const getPageDetails = () => {
    switch (location.pathname) {
      case "/":
        return {
          title: "Executive Dashboard",
          subtitle: "Overview of clients, sample distributions & sales visits",
        };
      case "/clients":
        return {
          title: "Client Directory",
          subtitle: "Manage salons, parlours, doctors & store partnerships",
        };
      case "/samples":
        return {
          title: "Product Samples Tracker",
          subtitle: "Log and monitor skincare sample dispatches and feedback",
        };
      case "/visits":
        return {
          title: "Field Visit Logs",
          subtitle: "Track sales representative visits and follow-up schedules",
        };
      default:
        return {
          title: "Abja Skin Care CRM",
          subtitle: "Premium Skincare Management Portal",
        };
    }
  };

  const { title, subtitle } = getPageDetails();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-badge">✨ Luxury Skincare</div>
          <h2>
            <span style={{ fontSize: "24px" }}>🌸</span> Abja Skin Care
          </h2>
        </div>

        <ul className="sidebar-nav">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              <span className="nav-icon">📊</span> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="nav-icon">👥</span> Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/samples"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="nav-icon">🧴</span> Samples
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/visits"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="nav-icon">📅</span> Field Visits
            </NavLink>
          </li>
        </ul>

       <div className="sidebar-footer" style={{ flexDirection: "column" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div className="user-avatar">A</div>
    <div className="user-info">
      <span className="user-name">Abja Care Admin</span>
      <span className="user-role">Sales Director</span>
    </div>
  </div>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.reload();
    }}
    style={{
      marginTop: "12px",
      width: "100%",
      padding: "8px",
      background: "#ff4d4f",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    🚪 Logout
  </button>
</div>

      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title-group">
            <h1>{title}</h1>
            <p className="header-subtitle">{subtitle}</p>
          </div>
          <div className="header-actions">
            <div className="date-pill">
              <span>📅</span> {currentDate}
            </div>
          </div>
        </header>

        <div className="fade-in">
          <Outlet />
        </div>
        
      </main>
    </div>
  );
};

export default Layout;
