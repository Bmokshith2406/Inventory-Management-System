import React, { useState } from "react";
import axios from "../api";
import "./AddInventoryForm.css";

function AddInventoryForm() {
  // State variables to manage input fields
  const [invid, setInvId] = useState(""); // State variable for inventory ID
  const [name, setName] = useState(""); // State variable for item name
  const [quantity, setQuantity] = useState(0); // State variable for item quantity
  const [price, setPrice] = useState(0); // State variable for item price
  const [description, setDescription] = useState(""); // State variable for item description

  // Function to handle form submission
  const handleAddInventory = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send a POST request to add inventory item details
      await axios.post("/api/inventory", {
        invid,
        name,
        quantity,
        price,
        description, // Include description in the POST request
      });
      alert("Inventory added successfully!"); // Show success message
      // Reset all input fields after successful submission
      setInvId("");
      setName("");
      setQuantity(0);
      setPrice(0);
      setDescription("");
    } catch (error) {
      console.error("Error adding inventory:", error); // Log any errors that occur
    }
  };

  return (
    <form onSubmit={handleAddInventory} className="inventory-form">
      {/* Input field for Inventory ID */}
      <div className="form-group">
        <label htmlFor="invid">Inventory ID:</label>
        <input
          type="text"
          id="invid"
          placeholder="Enter Inventory ID"
          value={invid}
          onChange={(e) => setInvId(e.target.value)}
          required // Make ID input required
        />
      </div>

      {/* Input field for Item Name */}
      <div className="form-group">
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required // Make name input required
        />
      </div>

      {/* Input field for Quantity */}
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required // Make quantity input required
        />
      </div>

      {/* Input field for Price */}
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required // Make price input required
        />
      </div>

      {/* Textarea for Description */}
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Enter Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required // Make description input required
        />
      </div>

      {/* Button to submit form */}
      <button type="submit" className="submit-button">
        Add Inventory
      </button>
    </form>
  );
}

export default AddInventoryForm;
