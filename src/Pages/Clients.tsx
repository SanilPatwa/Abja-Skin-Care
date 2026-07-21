import { useEffect, useState } from "react";
import ClientCard from "../Components/ClientCard";
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
            type: "Salon",
            phone: "6232933050",
            city: "Kolkata",
          },
        ];
  });

  const [newName, setNewName] = useState<string>("");
  const [newCity, setNewCity] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newType, setNewType] = useState<Client["type"]>("Salon");

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const handleAdd = () => {
    const newClient: Client = {
      id: clients.length + 1,
      name: newName,
      type: newType,
      phone: newPhone,
      city: newCity,
    };
    setClients([...clients, newClient]);
    setNewName("");
    setNewCity("");
    setNewPhone("");
    setNewType("Salon");
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  return (
    <div>
      <h2 className="page-title">Clients</h2>

      {/* Add Client Form */}
      <div className="add-client-form">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Client name"
        />
        <input
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="City"
        />
        <input
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Phone number"
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value as Client["type"])}
        >
          <option>Salon</option>
          <option>Doctor</option>
          <option>Ayurvedic Store</option>
          <option>Parlour</option>
        </select>
        <button className="btn-add" onClick={handleAdd}>
          + Add Client
        </button>
      </div>

      {/* Client Cards Grid */}
      <div className="clients-grid">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Clients;
