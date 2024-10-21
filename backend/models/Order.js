// models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  inventoryId: {
    type: String,
    required: true,
  }, // Reference to Inventory ID
  orderDate: { type: Date, default: Date.now }, // Save date and time
});

module.exports = mongoose.model("Order", OrderSchema);
