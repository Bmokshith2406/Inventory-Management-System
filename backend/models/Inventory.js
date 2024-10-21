const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  invid: { type: String, required: true }, // Ensure unique and not null
  name: { type: String, required: true },
  description: { type: String, default: "" },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("Inventory", InventorySchema);
