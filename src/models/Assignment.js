const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
