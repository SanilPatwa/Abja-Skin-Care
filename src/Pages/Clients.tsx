import { useEffect, useState } from "react";
import type { Client } from "../types";
import axios from "axios";
import CsvImportModal from "../Components/CsvImportModal";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

  const [newName, setNewName] = useState<string>("");
  const [newCity, setNewCity] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newType, setNewType] = useState<Client["type"]>("Salon");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("All");

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

  useEffect(() => {
    axios
      .get("https://abja-skin-care.onrender.com/api/clients", getAuthHeaders())
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.error("Error fetching clients", err));
  }, []);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newClient = {
      name: newName.trim(),
      type: newType,
      phone: newPhone.trim() || "Not provided",
      city: newCity.trim() || "Not specified"
    };
    axios
      .post("https://abja-skin-care.onrender.com/api/clients", newClient, getAuthHeaders())
      .then((res) => {
        setClients([res.data, ...clients]);
        setNewName("");
        setNewCity("");
        setNewPhone("");
        setNewType("Salon");
      })
      .catch((err) => console.error("Error adding client: ", err));
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`https://abja-skin-care.onrender.com/api/clients/${id}`, getAuthHeaders())
      .then(() => {
        setClients(clients.filter((client) => client.id !== id));
      })
      .catch((err) => console.error("Error deleting client:", err));
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
      {/* Top Header Bar with CSV Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap"
        }}
      >
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "var(--text-main)" }}>
            👥 Client Directory
          </h2>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", margin: "4px 0 0 0" }}>
            Manage salon, parlour, doctor & retail store partnerships
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCsvModalOpen(true)}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #4a7c6d 0%, #2d7a64 100%)",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(45, 122, 100, 0.35)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease"
          }}
        >
          <span>📥</span> Import Clients from CSV
        </button>
      </div>

      {/* Add Client Form */}
      <div className="add-client-form" style={{ marginBottom: "28px" }}>
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
            placeholder="e.g. Jaipur"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["All", "Salon", "Doctor", "Ayurvedic Store", "Parlour"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTypeFilter(type)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                background: selectedTypeFilter === type ? "var(--primary-rose)" : "#fff",
                color: selectedTypeFilter === type ? "#fff" : "var(--text-main)",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="🔍 Search clients by name, city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(210,195,180,0.7)",
            outline: "none",
            fontSize: "13.5px",
            width: "280px"
          }}
        />
      </div>

      {/* Client List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {filteredClients.map((client) => (
          <div key={client.id} className="card" style={{ padding: "20px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-main)" }}>{client.name}</h3>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "12px",
                  background: "var(--primary-rose-light)",
                  color: "var(--primary-rose-hover)"
                }}
              >
                {client.type}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "6px" }}>📍 {client.city}</p>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>📞 {client.phone}</p>
            <button
              onClick={() => handleDelete(client.id)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #f8b4b4",
                background: "#fde8e8",
                color: "#9b1c1c",
                fontWeight: 600,
                fontSize: "12.5px",
                cursor: "pointer"
              }}
            >
              🗑️ Delete Client
            </button>
          </div>
        ))}
      </div>

      {/* CSV Column Mapping Modal */}
      <CsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImportSuccess={(newClients) => setClients([...newClients, ...clients])}
      />
    </div>
  );
};

export default Clients;
