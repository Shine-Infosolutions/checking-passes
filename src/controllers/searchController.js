const fs = require("fs");
const path = require("path");
const passes = require("../data/passes.json");

const dataFilePath = path.join(__dirname, "../data/passes.json");

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

// ✅ Mark pass as used
const markEntry = (req, res) => {
  const number = parseInt(req.params.number);
  let found = false;

  passes.forEach(p => {
    if (p.passNumbers.includes(number)) {
      p.used = true;
      p.usedAt = new Date().toISOString();
      found = true;
    }
  });

  if (!found) {
    return res.status(404).json({ message: "Pass not found" });
  }

  // overwrite JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(passes, null, 2));

  res.json({ message: "Entry marked successfully", passes });
};

module.exports = { searchByName, searchByPassNo, markEntry };
