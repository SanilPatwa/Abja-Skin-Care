import { useEffect, useState } from "react";
import type { Client } from "../types";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem("clients");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Shejal Beauty Parlour",
            type: "Salon",
            phone: "6232933057",
            city: "Jaipur",
          },
          {
            id: 2,
            name: "Samiksha Beauty Parlour",
            type: "Salon",
            phone: "6232933059",
            city: "Delhi",
          },
          {
            id: 3,
            name: "Amisha Beauty Parlour",
            type: "Parlour",
            phone: "6232933050",
            city: "Kolkata",
          },
          {
            id: 4,
            name: "Dr. Herbal Skincare Clinic",
            type: "Doctor",
            phone: "9823011420",
            city: "Mumbai",
          },
          {
            id: 5,
            name: "Vedic Botanicals Store",
            type: "Ayurvedic Store",
            phone: "9123847291",
            city: "Pune",
          },
        ];
  });

  const [newName, setNewName] = useState<string>("");
  const [newCity, setNewCity] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newType, setNewType] = useState<Client["type"]>("Salon");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("All");

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newClient: Client = {
      id: Date.now(),
      name: newName.trim(),
      type: newType,
      phone: newPhone.trim() || "Not provided",
      city: newCity.trim() || "Not specified",
    };
    setClients([newClient, ...clients]);
    setNewName("");
    setNewCity("");
    setNewPhone("");
    setNewType("Salon");
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);
    const matchesType = selectedTypeFilter === "All" || c.type === selectedTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="fade-in">
      {/* Add Client Form */}
      <div className="add-client-form">
        <div className="form-group">
          <label>Client / Business Name</label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Blossom Glow Parlour"
          />
        </div>

        <div className="form-group">
          <label>City / Location</label>
          <input
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="e.g. Mumbai"
          />
        </div>

        <div className="form-group">
          <label>Contact Phone</label>
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="e.g. 9876543210"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as Client["type"])}
          >
            <option value="Salon">Salon</option>
            <option value="Doctor">Doctor / Dermatologist</option>
            <option value="Ayurvedic Store">Ayurvedic Store</option>
            <option value="Parlour">Parlour</option>
          </select>
        </div>

        <button className="btn-add" onClick={handleAdd}>
          <span>✨</span> Add Client Partner
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["All", "Salon", "Doctor", "Ayurvedic Store", "Parlour"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTypeFilter(type)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                border: "1px solid var(--card-border)",
                cursor: "pointer",
                transition: "var(--transition-fast)",
                background: selectedTypeFilter === type ? "var(--primary-rose)" : "var(--card-bg)",
                color: selectedTypeFilter === type ? "#ffffff" : "var(--text-muted)",
                boxShadow: selectedTypeFilter === type ? "0 4px 12px rgba(217, 119, 127, 0.3)" : "none",
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search clients or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Clients Sheet Table */}
      {filteredClients.length === 0 ? (
        <div className="glass-card" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "28px", marginBottom: "8px" }}>🌸</p>
          <p style={{ fontWeight: "600" }}>No clients found matching your search.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Category</th>
                <th>City</th>
                <th>Contact Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <strong>{client.name}</strong>
                  </td>
                  <td>
                    <span className="client-type-badge">{client.type}</span>
                  </td>
                  <td>📍 {client.city}</td>
                  <td>📞 {client.phone}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(client.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Clients;
