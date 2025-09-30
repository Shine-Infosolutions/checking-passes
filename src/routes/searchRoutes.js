const express = require("express");
const { searchByName, searchByPassNo ,markEntry} = require("../controllers/searchController");

const router = express.Router();

router.get("/name/:name", searchByName);
router.get("/passnumber/:number", searchByPassNo);
router.post("/entry/:number", markEntry);

module.exports = router;
