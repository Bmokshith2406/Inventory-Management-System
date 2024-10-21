const express = require("express");
const {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventoryItem, // Import the delete function
} = require("../controllers/inventoryController"); // Ensure this controller function exists

const router = express.Router();

router.get("/", getAllInventory); // Route to get all inventory items
router.post("/", addInventory); // Route to add a new inventory item
router.put("/:id", updateInventory); // Route to update an existing inventory item by ID
router.delete("/:id", deleteInventoryItem); // Route to delete an inventory item by ID

module.exports = router;
