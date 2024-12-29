import Booking from '../models/Booking.js';
import Bus from '../models/Bus.js';
import Permit from '../models/Permit.js';
import Seat from '../models/Seat.js';

export const createBooking = async (req, res) => {
  try {
    const { busId, seatNumbers, date } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    const seats = await Seat.find({ bus: busId });
    if (!seats || seats.length === 0) {
      return res.status(404).json({ message: 'No seats found for this bus' });
    }

    const unavailableSeats = seatNumbers.filter((seatNumber) => {
      const seat = seats.find((s) => s.seatNumber === seatNumber);
      return !seat || seat.status !== 'available';
    });

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: `The following seats are unavailable: ${unavailableSeats.join(', ')}`,
      });
    }

    await Seat.updateMany(
      { bus: busId, seatNumber: { $in: seatNumbers } },
      { $set: { status: 'booked' } }
    );

    const permit = await Permit.findOne({ bus: busId }).populate('route', 'startLocation endLocation pricePerSeat');
    if (!permit || !permit.route) {
      return res.status(404).json({ message: 'No valid route found for the selected bus' });
    }
    const route = permit.route;

    const totalPrice = seatNumbers.length * route.pricePerSeat;

    const booking = new Booking({
      user: req.user._id,
      bus: busId,
      route: route._id,
      seatNumbers,
      totalPrice,
      date,
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        _id: booking._id,
        bus: {
          id: bus._id,
          number: bus.busNumber,
        },
        route: {
          startLocation: route.startLocation,
          endLocation: route.endLocation,
          pricePerSeat: route.pricePerSeat,
        },
        seatNumbers,
        totalPrice,
        date,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('bus', 'busNumber busType')
      .populate('route', 'startLocation endLocation pricePerSeat');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate('user', 'name email')
      .populate('bus', 'busNumber busType')
      .populate('route', 'startLocation endLocation pricePerSeat');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await Seat.updateMany(
      { bus: booking.bus, seatNumber: { $in: booking.seatNumbers } },
      { $set: { status: 'available' } }
    );

    await booking.remove();
    res.status(200).json({ message: 'Booking canceled and seats released' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusSeats = async (req, res) => {
  try {
    const { busId } = req.params;

    const seats = await Seat.find({ bus: busId });
    if (!seats || seats.length === 0) {
      return res.status(404).json({ message: 'No seats found for this bus' });
    }

    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
