// src/models/UsedPass.js
const mongoose = require("mongoose");

const usedPassSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.models.UsedPass || mongoose.model("UsedPass", usedPassSchema);
