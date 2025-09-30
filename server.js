const express = require("express");
const cors = require("cors");

const searchRoutes = require("./src/routes/searchRoutes");

const app = express();
// Enable CORS only for your frontend
app.use(cors({
    origin: ["https://checking-passes.vercel.app", "http://localhost:5000", "http://localhost:5173"]
  }));
app.use(express.json());

// Routes
app.use("/get", searchRoutes);

// Default route
app.use("/", (req, res) => {
    res.send("API working");
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
