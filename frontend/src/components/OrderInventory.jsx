import React, { useState, useEffect } from "react";
import axios from "../api";
import "./OrderInventory.css"; // Import CSS file

function OrderInventory() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItemStock, setSelectedItemStock] = useState(null); // Track stock of selected item

  // Fetch inventory items when the component mounts
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get("/api/inventory");
        setInventoryItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchInventoryItems();
  }, []);

  // Handle selecting an item and show its stock
  const handleItemSelect = (e) => {
    const selectedItemName = e.target.value;
    setItemName(selectedItemName);

    // Find the stock of the selected item
    const selectedItem = inventoryItems.find(
      (item) => item.name === selectedItemName
    );
    if (selectedItem) {
      setSelectedItemStock(selectedItem.quantity); // Set the selected item's stock
    } else {
      setSelectedItemStock(null); // Reset if no item is selected
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/orders", { itemName, quantity });

      // If the order is placed successfully, reset fields and show success message
      alert(response.data.message || "Order placed successfully!");
      setItemName("");
      setQuantity(0);
      setSelectedItemStock(null); // Reset stock display
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // If error is related to insufficient stock
        alert(error.response.data.message || "Insufficient stock available.");
      } else {
        // Handle other types of errors
        console.error("Error placing order:", error);
        alert("Error placing order. Please check the console for details.");
      }
    }
  };

  return (
    <div>
      {inventoryItems.length === 0 ? (
        <p className="no-inventory-message">
          Inventory is Empty.
        </p>
      ) : (
        <form className="order-inventory-form" onSubmit={handleOrder}>
          <div className="form-group">
            <label htmlFor="itemName">Item Name:</label>
            <select
              id="itemName"
              value={itemName}
              onChange={handleItemSelect}
              required
            >
              <option value="" disabled>
                Select Item
              </option>
              {inventoryItems.map((item) => (
                <option key={item._id} value={item.name}>{item.name}
                </option>
              ))}
            </select>
          </div>
          {selectedItemStock !== null && (
            <div className="stock-info">
              <p>Available Stock: {selectedItemStock}</p>{" "}
              {/* Display the stock info */}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}

export default OrderInventory;
