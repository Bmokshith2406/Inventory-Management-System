const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const inventoryRoutes = require("./routes/inventoryRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Print confirmation on successful connection
    console.log("Successfully connected to MongoDB!");

    // Start the Express server on the specified port
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    // Print error if there's an issue connecting to MongoDB or starting the server
    console.error("Error starting server:", error);
  }
};

// Call the function to start the server
startServer();
