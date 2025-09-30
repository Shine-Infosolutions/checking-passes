const express = require("express");
const cors = require("cors");

const searchRoutes = require("./src/routes/searchRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/search", searchRoutes);

// Default route
app.use("/", (req, res) => {
    res.send("API working");
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
