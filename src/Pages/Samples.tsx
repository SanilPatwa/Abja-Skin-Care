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
        ];
  });

  useEffect(() => {
    localStorage.setItem("samples", JSON.stringify(samples));
  }, [samples]);

  return (
    <div>
      <h2 className="page-title">Product Samples</h2>
      <div className="add-client-form">
        <input placeholder="Client name" />
        <input placeholder="Product name" />
        <input type="number" placeholder="Quantity" />
        <input type="date" />
        <input placeholder="Notes / feedback" />
        <button className="btn-add">+ Add Sample</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample) => (
              <tr key={sample.id}>
                <td>
                  <strong>{sample.clientName}</strong>
                </td>
                <td>{sample.productName}</td>
                <td>{sample.quantity}</td>
                <td>{sample.date}</td>
                <td>{sample.notes}</td>
                <td>
                  <button className="btn-delete">Delete</button>
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
