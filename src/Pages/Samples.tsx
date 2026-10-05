import { useState, useEffect } from "react";
import type { Sample } from "../types";

const Samples = () => {
  const [samples, setSamples] = useState<Sample[]>(() => {
    const saved = localStorage.getItem("samples");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            clientName: "Shejal Beauty Parlour",
            productName: "Aloe Vera Gel",
            quantity: 5,
            date: "2026-07-25",
            notes: "Initial test sample",
          },
          {
            id: 2,
            clientName: "Samiksha Beauty Parlour",
            productName: "Kumkumadi Radiance Serum",
            quantity: 3,
            date: "2026-07-26",
            notes: "Sent for facial demo",
          },
          {
            id: 3,
            clientName: "Dr. Herbal Skincare Clinic",
            productName: "Rose Petal Glow Scrub",
            quantity: 10,
            date: "2026-07-27",
            notes: "Bulk clinic sample pack",
          },
        ];
  });

  const [newClientName, setNewClientName] = useState<string>("");
  const [newProductName, setNewProductName] = useState<string>("Aloe Vera Gel");
  const [newQuantity, setNewQuantity] = useState<number>(5);
  const [newDate, setNewDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [newNotes, setNewNotes] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("samples", JSON.stringify(samples));
  }, [samples]);

  const handleAdd = () => {
    if (!newClientName.trim()) return;
    const newSample: Sample = {
      id: Date.now(),
      clientName: newClientName.trim(),
      productName: newProductName,
      quantity: newQuantity || 1,
      date: newDate || new Date().toISOString().split("T")[0],
      notes: newNotes.trim() || "No notes",
    };
    setSamples([newSample, ...samples]);
    setNewClientName("");
    setNewProductName("Aloe Vera Gel");
    setNewQuantity(5);
    setNewNotes("");
  };

  const handleDelete = (id: number) => {
    setSamples(samples.filter((s) => s.id !== id));
  };

  return (
    <div className="fade-in">
      {/* Add Sample Form */}
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
          <label>Skincare Product</label>
          <select
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          >
            <option value="Aloe Vera Gel">Aloe Vera Pure Gel</option>
            <option value="Kumkumadi Radiance Serum">Kumkumadi Radiance Serum</option>
            <option value="Rose Petal Glow Scrub">Rose Petal Glow Scrub</option>
            <option value="Vitamin C Brightening Lotion">Vitamin C Brightening Lotion</option>
            <option value="Neem Purifying Cleanser">Neem Purifying Cleanser</option>
          </select>
        </div>

        <div className="form-group" style={{ maxWidth: "120px" }}>
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
          />
        </div>

        <div className="form-group" style={{ maxWidth: "160px" }}>
          <label>Dispatch Date</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Feedback / Notes</label>
          <input
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="e.g. For trial demo pack"
          />
        </div>

        <button className="btn-add" onClick={handleAdd}>
          <span>🧴</span> Log Sample
        </button>
      </div>

      {/* Samples Data Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client Partner</th>
              <th>Skincare Product</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Notes / Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample) => (
              <tr key={sample.id}>
                <td>
                  <strong>{sample.clientName}</strong>
                </td>
                <td>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    🧴 {sample.productName}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      background: "var(--sage-green-light)",
                      color: "var(--sage-green)",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    {sample.quantity} units
                  </span>
                </td>
                <td>📅 {sample.date}</td>
                <td>{sample.notes}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(sample.id)}>
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

export default Samples;
