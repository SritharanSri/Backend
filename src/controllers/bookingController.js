const bookings = require('../models/bookingModel');
const buses = require('../models/busModel');

exports.createBooking = (req, res) => {
  const { busId, seatCount } = req.body;
  const bus = buses.find(b => b.id === busId);
  if (!bus) return res.status(404).json({ message: 'Bus not found' });

  if (bus.seats < seatCount) {
    return res.status(400).json({ message: 'Not enough seats available' });
  }

  bus.seats -= seatCount;
  const booking = { id: Date.now(), busId, userId: req.user.id, seatCount };
  bookings.push(booking);
  res.status(201).json({ message: 'Booking confirmed', booking });
};

exports.getBookings = (req, res) => {
  const userBookings = bookings.filter(b => b.userId === req.user.id);
  res.json(userBookings);
};
