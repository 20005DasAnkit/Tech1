import React, { useEffect, useState } from 'react';
import './AdminOrdersPage.css';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error loading orders:', err));
  }, []);

  return (
    <div className="admin-orders-container">
      <h2 className="title">
        🛒 Store Orders
      </h2>
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>₹{order.total}</td>
                <td><span className="status">{order.status}</span></td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
