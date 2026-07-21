import type { Client } from "../types";

interface ClientCardProps {
  client: Client;
  onDelete: (id: number) => void;
}

const ClientCard = ({ client, onDelete }: ClientCardProps) => {
  return (
    <div className="client-card">
      <p className="client-name">{client.name}</p>
      <span className="client-type-badge">{client.type}</span>
      <p className="client-meta">📍 {client.city}</p>
      <p className="client-meta">📞 {client.phone}</p>
      <button className="btn-delete" onClick={() => onDelete(client.id)}>
        Delete
      </button>
    </div>
  );
};

export default ClientCard;
