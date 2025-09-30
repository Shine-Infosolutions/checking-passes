const passes = require("../data/passes.json");

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

// Get all passes with per-number status (read-only, all false)
const getAllPasses = (req, res) => {
  const allPasses = passes.map(p => {
    const passNumbersStatus = p.passNumbers.map(num => ({
      number: num,
      used: false,   // always false in this read-only version
      usedAt: null
    }));
    return { ...p, passNumbersStatus };
  });
  res.json(allPasses);
};

module.exports = { searchByName, searchByPassNo, getAllPasses };
