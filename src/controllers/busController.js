const buses = require('../models/busModel');

exports.getBuses = (req, res) => {
  res.json(buses);
};
