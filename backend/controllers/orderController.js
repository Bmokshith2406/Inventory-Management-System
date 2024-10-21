const Inventory = require("../models/Inventory"); // Adjust the path as necessary
const Order = require("../models/Order"); // Import the Order model

// Create order function
const createOrder = async (req, res) => {
  const { itemName, quantity } = req.body;

  try {
    // Find the item in the inventory by name
    const item = await Inventory.findOne({ name: itemName });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the requested quantity is available
    if (item.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Update the inventory quantity
    item.quantity -= quantity;
    await item.save();

    // Save the order to the orders collection upon successful order placement
    const newOrder = new Order({
      itemName,
      quantity,
      inventoryId: item.invid, // Include inventory ID in the order
      orderDate: new Date(), // Save the current date and time
    });

    await newOrder.save(); // Save the new order

    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOrder, getAllOrders };
