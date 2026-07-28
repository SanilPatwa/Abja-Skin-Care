import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Client, Sample, Visit } from "../types";

const Dashboard = () => {
  const [clientsCount, setClientsCount] = useState<number>(0);
  const [samplesCount, setSamplesCount] = useState<number>(0);
  const [visitsCount, setVisitsCount] = useState<number>(0);
  const [pendingVisitsCount, setPendingVisitsCount] = useState<number>(0);
  const [recentVisits, setRecentVisits] = useState<Visit[]>([]);
  const [recentSamples, setRecentSamples] = useState<Sample[]>([]);

  useEffect(() => {
    // Load clients
    const savedClients = localStorage.getItem("clients");
    if (savedClients) {
      const parsed: Client[] = JSON.parse(savedClients);
      setClientsCount(parsed.length);
    } else {
      setClientsCount(3);
    }

    // Load samples
    const savedSamples = localStorage.getItem("samples");
    if (savedSamples) {
      const parsed: Sample[] = JSON.parse(savedSamples);
      setSamplesCount(parsed.reduce((acc, curr) => acc + (Number(curr.quantity) || 1), 0));
      setRecentSamples(parsed.slice(-3));
    } else {
      setSamplesCount(5);
      setRecentSamples([
        {
          id: 1,
          clientName: "Shejal Beauty Parlour",
          productName: "Aloe Vera Gel",
          quantity: 5,
          date: "2026-07-25",
          notes: "Initial test sample",
        },
      ]);
    }

    // Load visits
    const savedVisits = localStorage.getItem("visits");
    if (savedVisits) {
      const parsed: Visit[] = JSON.parse(savedVisits);
      setVisitsCount(parsed.length);
      setPendingVisitsCount(parsed.filter((v) => v.status === "Pending").length);
      setRecentVisits(parsed.slice(-4));
    } else {
      setVisitsCount(2);
      setPendingVisitsCount(1);
      setRecentVisits([
        {
          id: 1,
          clientName: "Shejal Beauty Parlour",
          salesRep: "Rahul",
          date: "2025-07-10",
          notes: "Discussed new products",
          status: "Completed",
        },
        {
          id: 2,
          clientName: "Samiksha Beauty Parlour",
          salesRep: "Priya",
          date: "2025-07-12",
          notes: "Follow-up needed",
          status: "Pending",
        },
      ]);
    }
  }, []);

  return (
    <div className="fade-in">
      {/* Top KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Clients</h3>
            <div className="stat-icon-wrapper rose">👥</div>
          </div>
          <div className="stat-value">{clientsCount}</div>
          <div className="stat-trend up">
            <span>↑ 14%</span> vs last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Samples Dispatched</h3>
            <div className="stat-icon-wrapper gold">🧴</div>
          </div>
          <div className="stat-value">{samplesCount}</div>
          <div className="stat-trend up">
            <span>↑ 28%</span> high sample demand
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Visits</h3>
            <div className="stat-icon-wrapper sage">📅</div>
          </div>
          <div className="stat-value">{visitsCount}</div>
          <div className="stat-trend up">
            <span>{pendingVisitsCount} Pending</span> follow-ups
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Conversion Rate</h3>
            <div className="stat-icon-wrapper purple">✨</div>
          </div>
          <div className="stat-value">82%</div>
          <div className="stat-trend up">
            <span>↑ 5.2%</span> sample conversion
          </div>
        </div>
      </div>

      {/* Main Dashboard Content Grid */}
      <div className="dashboard-grid">
        {/* Analytics Chart */}
        <div className="chart-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 className="chart-title">Sample Distribution Analytics</h3>
              <p className="chart-subtitle">Monthly breakdown of skincare product samples delivered to salons & parlours</p>
            </div>
            <div style={{ fontSize: "12px", background: "var(--primary-rose-light)", color: "var(--primary-rose)", padding: "4px 12px", borderRadius: "14px", fontWeight: "600" }}>
              2026 Q3 Overview
            </div>
          </div>

          <svg width="100%" height="240" viewBox="0 0 500 200" preserveAspectRatio="none" style={{ marginTop: "10px" }}>
            <defs>
              <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d9777f" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e8a3a8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c59b27" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e4c76b" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(230, 220, 210, 0.5)" strokeDasharray="4 4" />
            <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(230, 220, 210, 0.5)" strokeDasharray="4 4" />
            <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(230, 220, 210, 0.5)" strokeDasharray="4 4" />
            <line x1="40" y1="170" x2="480" y2="170" stroke="#e6dcd2" strokeWidth="1.5" />

            {/* Bars */}
            <rect className="chart-bar" x="70" y="70" width="36" height="100" />
            <rect className="chart-bar" x="140" y="45" width="36" height="125" />
            <rect className="chart-bar" x="210" y="90" width="36" height="80" />
            <rect className="chart-bar" x="280" y="35" width="36" height="135" />
            <rect className="chart-bar" x="350" y="60" width="36" height="110" />
            <rect className="chart-bar" x="420" y="25" width="36" height="145" />

            {/* Labels */}
            <text className="chart-text" x="88" y="190">Mar</text>
            <text className="chart-text" x="158" y="190">Apr</text>
            <text className="chart-text" x="228" y="190">May</text>
            <text className="chart-text" x="298" y="190">Jun</text>
            <text className="chart-text" x="368" y="190">Jul</text>
            <text className="chart-text" x="438" y="190">Aug</text>
          </svg>
        </div>

        {/* Side Widget: Recent Visits & Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="glass-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: "700" }}>
                Recent Field Visits
              </h3>
              <Link to="/visits" style={{ fontSize: "12px", color: "var(--primary-rose)", textDecoration: "none", fontWeight: "600" }}>
                View All →
              </Link>
            </div>

            <div className="timeline-list">
              {recentVisits.map((visit) => (
                <div className="timeline-item" key={visit.id}>
                  <div
                    className="timeline-bullet"
                    style={{
                      background: visit.status === "Completed" ? "var(--sage-green)" : "var(--accent-gold)",
                    }}
                  />
                  <div className="timeline-content">
                    <h4>{visit.clientName}</h4>
                    <p>👤 Rep: {visit.salesRep} • 📅 {visit.date}</p>
                    <span
                      className={`status-pill ${visit.status.toLowerCase()}`}
                      style={{ marginTop: "6px" }}
                    >
                      {visit.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ background: "linear-gradient(135deg, var(--sage-green-light) 0%, #ffffff 100%)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: "700", color: "var(--sage-green)", marginBottom: "8px" }}>
              🌿 Skincare Tip of the Day
            </h3>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: "1.5" }}>
              When presenting Aloe Vera & Kumkumadi Serums to Parlour Owners, highlight 100% organic certification for higher conversion.
            </p>
          </div>
        </div>
      </div>

      {/* Product Sample Highlights Table */}
      <div style={{ marginTop: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: "700" }}>
            Latest Dispatched Samples
          </h2>
          <Link to="/samples" style={{ fontSize: "13px", color: "var(--primary-rose)", fontWeight: "600", textDecoration: "none" }}>
            + Log New Sample
          </Link>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client Partner</th>
                <th>Skincare Product</th>
                <th>Units</th>
                <th>Dispatch Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {recentSamples.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.clientName}</strong></td>
                  <td>🧴 {s.productName}</td>
                  <td><span style={{ fontWeight: "700", color: "var(--sage-green)" }}>{s.quantity} pcs</span></td>
                  <td>📅 {s.date}</td>
                  <td>{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
