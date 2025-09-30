const express = require("express");
const { universalSearch } = require("../controllers/searchController");

const router = express.Router();

// Example:
// GET /passes?name=MD SIR
// GET /passes?number=2
// GET /passes -> returns all
router.get("/passes", universalSearch);

module.exports = router;
