import type { Client } from "../types";

interface ClientCardProps {
  client: Client;
  onDelete: (id: number) => void;
}

const ClientCard = ({ client, onDelete }: ClientCardProps) => {
  const getBadgeClass = (type: Client["type"]) => {
    switch (type) {
      case "Salon":
        return "client-type-badge salon";
      case "Doctor":
        return "client-type-badge doctor";
      case "Ayurvedic Store":
        return "client-type-badge ayurvedic-store";
      case "Parlour":
        return "client-type-badge parlour";
      default:
        return "client-type-badge salon";
    }
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "C";
  };

  return (
    <div className="client-card">
      <div className="client-card-header">
        <div className="client-avatar-badge">{getInitial(client.name)}</div>
        <span className={getBadgeClass(client.type)}>{client.type}</span>
      </div>

      <div>
        <h3 className="client-name">{client.name}</h3>
      </div>

      <div className="client-meta">
        <span>📍</span> {client.city || "Not specified"}
      </div>

      <div className="client-meta">
        <span>📞</span> {client.phone || "No phone listed"}
      </div>

      <div className="client-card-footer">
        <span style={{ fontSize: "11px", color: "var(--text-light)" }}>ID: #{client.id}</span>
        <button className="btn-delete" onClick={() => onDelete(client.id)}>
          <span>🗑️</span> Delete
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
