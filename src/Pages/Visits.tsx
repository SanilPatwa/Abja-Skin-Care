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
        ];
  });

  const [newClientName, setNewClientName] = useState<string>("");
  const [newSalesRep, setNewSalesRep] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("");
  const [newNotes, setNewNotes] = useState<string>("");
  const [newStatus, setNewStatus] = useState<Visit["status"]>("Pending");
  useEffect(() => {
    localStorage.setItem("visits", JSON.stringify(visits));
  }, [visits]);
  const handleAdd = () => {
    const newVisit: Visit = {
      id: visits.length + 1,
      clientName: newClientName,
      salesRep: newSalesRep,
      date: newDate,
      notes: newNotes,
      status: newStatus,
    };
    setVisits([...visits, newVisit]);
    setNewClientName("");
    setNewSalesRep("");
    setNewDate("");
    setNewNotes("");
    setNewStatus("Pending");
  };
  const handleDelete = (id: number) => {
    setVisits(visits.filter((v) => v.id !== id));
  };
  return (
    <div>
      <h2 className="page-title">Visits</h2>

      {/* Add Visit Form */}
      <div className="add-client-form">
        <input
          value={newClientName}
          onChange={(e) => setNewClientName(e.target.value)}
          placeholder="Client name"
        />
        <input
          value={newSalesRep}
          onChange={(e) => setNewSalesRep(e.target.value)}
          placeholder="Sales rep name"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
          placeholder="Notes / remarks"
        />
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value as Visit["status"])}
        >
          <option>Completed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
        <button className="btn-add" onClick={handleAdd}>
          + Add Visit
        </button>
      </div>

      {/* Visits List */}
      <div className="clients-grid">
        {visits.map((visit) => (
          <div key={visit.id} className="client-card">
            <p className="client-name">{visit.clientName}</p>
            <span className="client-type-badge">{visit.status}</span>
            <p className="client-meta">👤 {visit.salesRep}</p>
            <p className="client-meta">📅 {visit.date}</p>
            <p className="client-meta">📝 {visit.notes}</p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(visit.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visits;
