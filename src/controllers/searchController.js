const fs = require("fs");
const path = require("path");
const UsedPass = require("../models/UsedPass"); // Use your model
const passes = require("../data/passes.json");
const dataFilePath = path.join(__dirname, "../data/passes.json");

// Helper to merge JSON + MongoDB used status
const mergeUsedStatus = async (jsonPasses) => {
  try {
    const usedPasses = await UsedPass.find({}); // fetch all used passes from MongoDB
    const updatedPasses = jsonPasses.map(p => {
      const usedRecord = usedPasses.find(up =>
        up.passNumbers.some(num => p.passNumbers.includes(num))
      );
      if (usedRecord) {
        p.used = true;
        p.usedAt = usedRecord.usedAt;
      }
      return p;
    });
    return updatedPasses;
  } catch (err) {
    console.error("mergeUsedStatus error:", err);
    return jsonPasses;
  }
};

// Search by name
const searchByName = async (req, res) => {
  const name = req.params.name.toLowerCase();
  const updatedPasses = await mergeUsedStatus(passes);
  const result = updatedPasses.filter(p =>
    p.name.toLowerCase().includes(name)
  );
  res.json(result);
};

// Search by pass number
const searchByPassNo = async (req, res) => {
  const number = parseInt(req.params.number);
  const updatedPasses = await mergeUsedStatus(passes);
  const result = updatedPasses.filter(p =>
    p.passNumbers.includes(number)
  );
  res.json(result);
};

// Mark pass as used and store in MongoDB
const markEntry = async (req, res) => {
  try {
    const number = parseInt(req.params.number);
    let foundPass = null;

    // Find the pass in JSON
    for (const p of passes) {
      if (p.passNumbers.includes(number)) {
        if (p.used) {
          return res.status(400).json({ message: "Pass already used" });
        }
        p.used = true;
        p.usedAt = new Date().toISOString();
        foundPass = p;
        break; // Stop after first match
      }
    }

    if (!foundPass) {
      return res.status(404).json({ message: "Pass not found" });
    }

    // Save only this used pass to MongoDB
    const usedPassDoc = new UsedPass(foundPass);
    await usedPassDoc.save();

    // Update the JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(passes, null, 2));

    res.json({ message: "Entry marked successfully", pass: foundPass });
  } catch (err) {
    console.error("markEntry error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { searchByName, searchByPassNo, markEntry };
