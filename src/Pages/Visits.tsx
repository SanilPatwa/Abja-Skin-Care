import { useState, useEffect } from "react";
import type { Visit } from "../types";

const Visits = () => {
  const [visits, setVisits] = useState<Visit[]>(() => {
    const saved = localStorage.getItem("visits");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            clientName: "Shejal Beauty Parlour",
            salesRep: "Rahul Verma",
            date: "2026-07-25",
            notes: "Demoed Kumkumadi Serum, positive feedback",
            status: "Completed",
          },
          {
            id: 2,
            clientName: "Samiksha Beauty Parlour",
            salesRep: "Priya Sharma",
            date: "2026-07-30",
            notes: "Follow-up for bulk order catalog",
            status: "Pending",
          },
          {
            id: 3,
            clientName: "Vedic Botanicals Store",
            salesRep: "Amit Kumar",
            date: "2026-07-28",
            notes: "Review sample kit stock",
            status: "Pending",
          },
        ];
  });

  const [newClientName, setNewClientName] = useState<string>("");
  const [newSalesRep, setNewSalesRep] = useState<string>("");
  const [newDate, setNewDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [newNotes, setNewNotes] = useState<string>("");
  const [newStatus, setNewStatus] = useState<Visit["status"]>("Pending");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    localStorage.setItem("visits", JSON.stringify(visits));
  }, [visits]);

  const handleAdd = () => {
    if (!newClientName.trim()) return;
    const newVisit: Visit = {
      id: Date.now(),
      clientName: newClientName.trim(),
      salesRep: newSalesRep.trim() || "Unassigned",
      date: newDate || new Date().toISOString().split("T")[0],
      notes: newNotes.trim() || "No remarks",
      status: newStatus,
    };
    setVisits([newVisit, ...visits]);
    setNewClientName("");
    setNewSalesRep("");
    setNewNotes("");
    setNewStatus("Pending");
  };

  const handleDelete = (id: number) => {
    setVisits(visits.filter((v) => v.id !== id));
  };

  const filteredVisits = visits.filter((v) => {
    if (statusFilter === "All") return true;
    return v.status === statusFilter;
  });

  return (
    <div className="fade-in">
      {/* Add Visit Form */}
      <div className="add-client-form">
        <div className="form-group">
          <label>Client Partner</label>
          <input
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            placeholder="e.g. Shejal Beauty Parlour"
          />
        </div>

        <div className="form-group">
          <label>Sales Representative</label>
          <input
            value={newSalesRep}
            onChange={(e) => setNewSalesRep(e.target.value)}
            placeholder="e.g. Rahul Verma"
          />
        </div>

        <div className="form-group" style={{ maxWidth: "160px" }}>
          <label>Visit Date</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as Visit["status"])}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="form-group" style={{ flex: 2 }}>
          <label>Visit Remarks / Notes</label>
          <input
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="e.g. Discussed new product catalog"
          />
        </div>

        <button className="btn-add" onClick={handleAdd}>
          <span>📅</span> Schedule Visit
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["All", "Pending", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              border: "1px solid var(--card-border)",
              cursor: "pointer",
              transition: "var(--transition-fast)",
              background: statusFilter === status ? "var(--sage-green)" : "var(--card-bg)",
              color: statusFilter === status ? "#ffffff" : "var(--text-muted)",
              boxShadow: statusFilter === status ? "0 4px 12px rgba(74, 124, 109, 0.3)" : "none",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Visits Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client Partner</th>
              <th>Sales Representative</th>
              <th>Date</th>
              <th>Status</th>
              <th>Notes / Follow-up</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisits.map((visit) => (
              <tr key={visit.id}>
                <td>
                  <strong>{visit.clientName}</strong>
                </td>
                <td>👤 {visit.salesRep}</td>
                <td>📅 {visit.date}</td>
                <td>
                  <span className={`status-pill ${visit.status.toLowerCase()}`}>
                    {visit.status}
                  </span>
                </td>
                <td>📝 {visit.notes}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(visit.id)}
                  >
                    <span>🗑️</span> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Visits;
