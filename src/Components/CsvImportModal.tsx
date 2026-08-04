import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import type { Client } from "../types";

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (newClients: Client[]) => void;
}

const CsvImportModal = ({ isOpen, onClose, onImportSuccess }: CsvImportModalProps) => {
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);
  const [columnMapping, setColumnMapping] = useState({
    name: "",
    type: "",
    phone: "",
    city: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.meta.fields && results.meta.fields.length > 0) {
          const headers = results.meta.fields;
          setCsvHeaders(headers);
          setRawData(results.data);

          // Smart auto-matching headers
          const autoMap = {
            name: headers.find((h) => /name|client|customer|business/i.test(h)) || headers[0] || "",
            type: headers.find((h) => /type|category|nature|tag/i.test(h)) || "",
            phone: headers.find((h) => /phone|mobile|contact|tel/i.test(h)) || "",
            city: headers.find((h) => /city|location|address|place/i.test(h)) || ""
          };
          setColumnMapping(autoMap);
        } else {
          setError("No headers found in the selected CSV file.");
        }
      },
      error: () => setError("Failed to parse CSV file.")
    });
  };

  const handleImport = () => {
    if (!columnMapping.name) {
      setError("Please map at least the 'Client / Business Name' column.");
      return;
    }

    setLoading(true);
    setError("");

    // Transform raw CSV rows into standardized Client objects based on user's column mapping
    const formattedClients = rawData.map((row) => ({
      name: row[columnMapping.name]?.toString().trim() || "Unnamed Business",
      type: row[columnMapping.type]?.toString().trim() || "Salon",
      phone: row[columnMapping.phone]?.toString().trim() || "Not provided",
      city: row[columnMapping.city]?.toString().trim() || "Not specified"
    }));

    const getAuthHeaders = () => ({
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    axios
      .post("https://abja-skin-care.onrender.com/api/clients/bulk", { clients: formattedClients }, getAuthHeaders())
      .then((res) => {
        setLoading(false);
        onImportSuccess(res.data.importedClients);
        onClose();
        alert(res.data.message || "Clients imported successfully!");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.error || "Failed to import clients via bulk endpoint.");
      });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20
      }}
    >
      <div
        className="auth-card"
        style={{
          maxWidth: 580,
          maxHeight: "90vh",
          overflowY: "auto",
          textAlign: "left"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="auth-title" style={{ fontSize: 24, margin: 0 }}>
            📥 Import Clients from CSV
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        <p className="auth-subtitle" style={{ marginBottom: 20 }}>
          Upload a CSV file and map your CSV columns to CRM database fields.
        </p>

        {error && (
          <div className="auth-error-alert" style={{ marginBottom: 16 }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* File Upload Input */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Select CSV File:
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{
              width: "100%",
              padding: 10,
              border: "1px dashed #c59b27",
              borderRadius: 10,
              background: "#fff8ec",
              cursor: "pointer"
            }}
          />
        </div>

        {/* Column Mapping Section */}
        {csvHeaders.length > 0 && (
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 12, borderBottom: "1px solid #eee", paddingBottom: 6 }}>
              ⚙️ Column Mapping
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600 }}>Client Name Column (*):</label>
                <select
                  value={columnMapping.name}
                  onChange={(e) => setColumnMapping({ ...columnMapping, name: e.target.value })}
                  className="auth-input"
                  style={{ paddingLeft: 12 }}
                >
                  <option value="">-- Select CSV Header --</option>
                  {csvHeaders.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600 }}>Client Type / Category:</label>
                <select
                  value={columnMapping.type}
                  onChange={(e) => setColumnMapping({ ...columnMapping, type: e.target.value })}
                  className="auth-input"
                  style={{ paddingLeft: 12 }}
                >
                  <option value="">-- Select CSV Header --</option>
                  {csvHeaders.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600 }}>Phone Number:</label>
                <select
                  value={columnMapping.phone}
                  onChange={(e) => setColumnMapping({ ...columnMapping, phone: e.target.value })}
                  className="auth-input"
                  style={{ paddingLeft: 12 }}
                >
                  <option value="">-- Select CSV Header --</option>
                  {csvHeaders.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600 }}>City / Location:</label>
                <select
                  value={columnMapping.city}
                  onChange={(e) => setColumnMapping({ ...columnMapping, city: e.target.value })}
                  className="auth-input"
                  style={{ paddingLeft: 12 }}
                >
                  <option value="">-- Select CSV Header --</option>
                  {csvHeaders.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preview Section */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>
                Found {rawData.length} rows in CSV. Ready to import!
              </span>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={loading}
                className="auth-submit-btn"
                style={{ width: "auto", padding: "10px 24px" }}
              >
                {loading ? "Importing..." : `Import ${rawData.length} Clients 🚀`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvImportModal;
