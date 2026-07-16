import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="sidebar">
          <h2>Abja Health Care</h2>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/samples">Samples</Link>
            </li>
            <li>
              <Link to="/visits">Visits</Link>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
