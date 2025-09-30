const passes = require("../data/passes.json");

// Universal search
const universalSearch = (req, res) => {
  const { name, number } = req.query; // accept query params: ?name=xyz or ?number=123

  let result = passes;

  if (name) {
    const nameLower = name.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(nameLower));
  }

  if (number) {
    const num = parseInt(number);
    result = result.filter(p => p.passNumbers.includes(num));
  }

  // Add per-number status (read-only, all false)
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
