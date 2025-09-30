const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const searchRoutes = require("./src/routes/searchRoutes");

const app = express();

// Enable CORS only for your frontend
app.use(cors({
  origin: ["https://checking-passes.vercel.app", "http://localhost:5000", "http://localhost:5173"]
}));

app.use(express.json());

// Routes
app.use("/search", searchRoutes);

// Default route
app.use("/", (req, res) => {
  res.send("API working");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));

