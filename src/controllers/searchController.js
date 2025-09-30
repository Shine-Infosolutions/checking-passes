const passes = require("../data/passes.json");

// Universal search: name, number, or all
const universalSearch = (req, res) => {
  const { name, number } = req.query;

  let result = passes;

  if (name) {
    const nameLower = name.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(nameLower));
  }

  if (number) {
    const num = parseInt(number);
    result = result.filter(p => p.passNumbers.includes(num));
  }

  // Optional: include per-number read-only status
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
