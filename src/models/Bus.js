const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  number: { type: String, required: true },
  route: { type: String, required: true },
  seats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

module.exports = mongoose.model("Bus", busSchema);
