const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const passes = require("../data/passes.json");
const dataFilePath = path.join(__dirname, "../data/passes.json");

// Flexible schema for used passes
const usedPassSchema = new mongoose.Schema({}, { strict: false });
const UsedPass = mongoose.model("UsedPass", usedPassSchema);

// Search by name
const searchByName = (req, res) => {
  const name = req.params.name.toLowerCase();
  const result = passes.filter(p =>
    p.name.toLowerCase().includes(name)
  );
  res.json(result);
};

// Search by pass number
const searchByPassNo = (req, res) => {
  const number = parseInt(req.params.number);
  const result = passes.filter(p =>
    p.passNumbers.includes(number)
  );
  res.json(result);
};

// Mark pass as used and store in MongoDB
const markEntry = async (req, res) => {
  try {
    const number = parseInt(req.params.number);
    let found = false;

    passes.forEach(p => {
      if (p.passNumbers.includes(number)) {
        p.used = true;
        p.usedAt = new Date().toISOString();
        found = true;

        // Save only this used pass to MongoDB
        const usedPass = new UsedPass(p);
        usedPass.save().catch(err => console.error("MongoDB save error:", err));
      }
    });

    if (!found) {
      return res.status(404).json({ message: "Pass not found" });
    }

    // Overwrite JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(passes, null, 2));

    res.json({ message: "Entry marked successfully", passes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { searchByName, searchByPassNo, markEntry };
