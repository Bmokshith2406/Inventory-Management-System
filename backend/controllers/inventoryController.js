const Inventory = require("../models/Inventory"); // Adjust the path as necessary

// Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new inventory item
const addInventory = async (req, res) => {
  const { invid, name, quantity, price, description } = req.body;
  try {
    const newItem = await Inventory.create({
      invid,
      name,
      quantity,
      price,
      description,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding inventory:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to update an existing inventory item
const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { invid, name, quantity, price } = req.body;

  try {
    // Find and update the inventory item by ID
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { invid, name, quantity, price },
      { new: true } // Return the updated document
    );

    if (!updatedInventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json(updatedInventory);
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete inventory item function
const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Inventory.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventoryItem, // Export the delete function
};
