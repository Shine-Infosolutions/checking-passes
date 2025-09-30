const passes = require("../data/passes.json");

const universalSearch = (req, res) => {
  const { name, number } = req.query;

  let result = passes.map(p => ({
    ...p,
    name: p.NAME,                          // normalize NAME
    passNumbers: p.PASS_NO
      ? p.PASS_NO.split(",").map(n => n.trim())
      : []                                 // normalize PASS_NO
  }));

  if (name) {
    const nameLower = name.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(nameLower));
  }

  if (number) {
    result = result.filter(p => p.passNumbers.includes(number));
  }

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
