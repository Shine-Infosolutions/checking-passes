const passes = require("../data/passes.json");

// Universal search: by name OR pass number
const universalSearch = (req, res) => {
  const { name, number } = req.query;

  if (!name && !number) {
    return res.status(400).json({ message: "Please provide either a name or pass number to search." });
  }

  let result = passes;

  if (name) {
    const nameLower = name.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(nameLower));
  } else if (number) {
    const num = parseInt(number);
    result = result.filter(p => p.passNumbers.includes(num));
  }

  // Add per-number status (all false since this is read-only)
  const finalResult = result.map(p => ({
    ...p,
    passNumbersStatus: p.passNumbers.map(num => ({
      number: num,
      used: false,
      usedAt: null
    }))
  }));

  res.json(finalResult);
};

module.exports = { universalSearch };
