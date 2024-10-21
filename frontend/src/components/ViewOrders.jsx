import React, { useState, useEffect } from "react";
import axios from "../api";
import "./ViewOrders.css";

function ViewOrders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="view-orders">
      {orders.length === 0 ? (
        <p className="no-orders-message">
          No orders have been Placed Yet.
        </p>
      ) : (
        <div>
          <h2 style={{ width: "30%", margin: "auto", marginTop: "35px" }}>
            All Orders
          </h2>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Order Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.inventoryId}</td>
                  <td>{order.itemName}</td>
                  <td>{order.quantity}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewOrders;
