import { useState } from "react";
import ClientCard from "../Components/ClientCard";

interface Client {
  id: number;
  name: string;
  type: "Salon" | "Doctor" | "Ayurvedic Store" | "Parlour";
  phone: string;
  city: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Shejal Beauty Parlour", type: "Salon", phone: "6232933057", city: "Jaipur" },
    { id: 2, name: "Samiksha Beauty Parlour", type: "Salon", phone: "6232933059", city: "Delhi" },
    { id: 3, name: "Amisha Beauty Parlour", type: "Salon", phone: "6232933050", city: "Kolkata" },
  ]);

  const [newName, setNewName] = useState<string>("");
  const handleAdd = () => {
    const newClient: Client = {
      id: clients.length + 1, // simple ID generation
      name: newName,
      type: "Salon", // hardcoded for now
      phone: "0000000000", // hardcoded for now
      city: "Unknown", // hardcoded for now
    };
    setClients([...clients, newClient]); // spread old list + add new one
    setNewName(""); // clear the input after adding
  };

  return (
    <div>
      <h2>Clients</h2>
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter client name"
      />
      <button onClick={handleAdd}>Add Client</button>
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
};

export default Clients;
