const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder); // Route to place an order
router.get("/", getAllOrders); // Route to get all orders

module.exports = router;
