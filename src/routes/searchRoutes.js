const express = require("express");
const { searchByName, searchByPassNo ,getAllPasses} = require("../controllers/searchController");

const router = express.Router();

router.get("/all", getAllPasses);
router.get("/name/:name", searchByName);
router.get("/passnumber/:number", searchByPassNo);

module.exports = router;
