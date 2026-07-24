import { useState, useEffect } from "react";

const Samples = () => {
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
            <tr>
              <td>
                <strong>Sample Client</strong>
              </td>
              <td>Test Cream</td>
              <td>5</td>
              <td>2026-07-23</td>
              <td>Initial test sample</td>
              <td>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Samples;
