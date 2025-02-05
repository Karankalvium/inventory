require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const InventoryItem = require("./models/InventoryItem");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// API Routes

// GET all inventory items
app.get("/api/inventory", async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory" });
  }
});

// POST new inventory item
app.post("/api/inventory", async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const newItem = new InventoryItem({ name, quantity, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));