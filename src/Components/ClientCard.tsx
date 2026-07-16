interface Client {
  id: number;
  name: string;
  city: string;
  phone: string;
  type: "Salon" | "Doctor" | "Ayurvedic Store" | "Parlour";
}

interface ClientCardProps {
  client: Client;
}

const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <div>
      <strong>{client.name}</strong>
      <p>
        {client.type} — {client.city}
      </p>
      <p>📞 {client.phone}</p>
    </div>
  );
};

export default ClientCard;
