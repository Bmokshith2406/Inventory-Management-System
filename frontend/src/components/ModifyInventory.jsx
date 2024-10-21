import React, { useState, useEffect } from "react";
import axios from "../api";
import "./ModifyInventory.css";

function ModifyInventory() {
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingQuantity, setEditingQuantity] = useState(0);
  const [editingPrice, setEditingPrice] = useState(0);

  // Fetch the inventory data from the server
  const fetchInventory = async () => {
    try {
      const response = await axios.get("/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // Handle modification of inventory
  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditingName(item.name);
    setEditingQuantity(item.quantity);
    setEditingPrice(item.price);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`/api/inventory/${id}`, {
        name: editingName,
        quantity: editingQuantity,
        price: editingPrice,
      });
      fetchInventory(); // Refresh the inventory list
      setEditingId(null); // Exit editing mode
    } catch (error) {
      console.error("Error modifying inventory:", error);
    }
  };

  const handleModify = async (id, newQuantity) => {
    if (newQuantity < 0) {
      alert("Quantity cannot be less than zero!");
      return;
    }
    try {
      await axios.put(`/api/inventory/${id}`, { quantity: newQuantity });
      fetchInventory(); // Refresh the inventory list
    } catch (error) {
      console.error("Error modifying inventory:", error);
    }
  };

  // New function to handle deletion of inventory items
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`/api/inventory/${id}`);
        fetchInventory(); // Refresh the inventory list after deletion
      } catch (error) {
        console.error("Error deleting inventory:", error);
      }
    }
  };

  // Fetch inventory when the component mounts
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div>
      {inventory.length === 0 ? (
        <p className="no-inventory-message">
          Inventory is Empty.
        </p>
      ) : (
        <div className="modify-inventory">
          <h2>Modify Inventory</h2>
          <ul className="inventory-list">
            {inventory.map((item) => (
              <li key={item._id} className="inventory-item">
                {editingId === item._id ? (
                  <>
                    <div className="form-group">
                      <label htmlFor={`name-${item._id}`}>Item Name:</label>
                      <input
                        type="text"
                        id={`name-${item._id}`}
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`quantity-${item._id}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${item._id}`}
                        value={editingQuantity}
                        onChange={(e) =>
                          setEditingQuantity(Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`price-${item._id}`}>Price:</label>
                      <input
                        type="number"
                        id={`price-${item._id}`}
                        value={editingPrice}
                        onChange={(e) =>
                          setEditingPrice(Number(e.target.value))
                        }
                      />
                    </div>
                    <button
                      onClick={() => handleSave(item._id)}
                      className="modify-button save"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="modify-button cancel"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="item-id">{item.invid}</span> -
                    <span className="item-id">{item.name}</span> -
                    <span className="item-quantity">
                      {" "}
                      Quantity: {item.quantity}
                    </span>{" "}
                    -
                    <span className="item-price">
                      {" "}
                      Price: ${item.price.toFixed(2)}
                    </span>
                    <div className="button-group">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="modify-button edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleModify(item._id, item.quantity + 1)}
                        className="modify-button increase"
                      >
                        Increase
                      </button>
                      <button
                        onClick={() => handleModify(item._id, item.quantity - 1)}
                        className="modify-button decrease"
                      >
                        Decrease
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="modify-button delete"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ModifyInventory;
