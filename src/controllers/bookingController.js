import Booking from '../models/Booking.js';
import Bus from '../models/Bus.js';
import Permit from '../models/Permit.js';
import Seat from '../models/Seat.js';
import schedule from 'node-schedule';

export const createBooking = async (req, res) => {
  try {
    const { userId,busId, seatNumbers, date } = req.body;

    const bus = await Bus.findById({_id: busId});
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

    const permit = await Permit.findOne({ bus: busId }).populate('route', 'startLocation endLocation pricePerSeat');
    if (!permit || !permit.route) {
      return res.status(404).json({ message: 'No valid route found for the selected bus' });
    }
    const route = permit.route;

    const totalPrice = seatNumbers.length * route.pricePerSeat;

    const booking = new Booking({
      user: userId,
      bus: busId,
      route: route._id,
      seatNumbers,
      totalPrice,
      date,
    });

    console.log(route);
    

    await booking.save();
    

    await Seat.updateMany(
      { bus: busId, seatNumber: { $in: seatNumbers } },
      { $set: { status: 'booked' } }
    );

    seatNumbers.forEach((seatNumber) => {
      schedule.scheduleJob(Date.now() + 24 * 60 * 60 * 1000, async () => {
        await Seat.updateOne({ bus: busId, seatNumber }, { $set: { status: 'available' } });
      });
    });

    schedule.scheduleJob(Date.now() + 24 * 60 * 60 * 1000, async () => {
      const updatedBooking = await Booking.findById(booking._id);
      if (updatedBooking && updatedBooking.paymentStatus === 'unpaid') {
        await Seat.updateMany(
          { bus: busId, seatNumber: { $in: seatNumbers } },
          { $set: { status: 'available' } }
        );
        await Booking.findByIdAndDelete(booking._id); 
      }
    });
    


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

export const processPayment = async (req, res) => {
  try {
    const { bookingId, cardNumber, expiryDate, cvv, cardHolderName } = req.body;

    const booking = await Booking.findById(bookingId)//.populate('route', 'pricePerSeat');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Payment has already been completed for this booking.' });
    }

    const validateCardNumber = (cardNumber) => {
      const digits = cardNumber.replace(/\D/g, '');
      let sum = 0;
      let shouldDouble = false;

      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i), 10);

        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
      }

      return sum % 10 === 0;
    };

    if (!validateCardNumber(cardNumber)) {
      return res.status(400).json({ message: 'Invalid card number' });
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [expMonth, expYear] = expiryDate.split('/').map(Number);

    if (!expMonth || !expYear || expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return res.status(400).json({ message: 'Card is expired' });
    }

    if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
      return res.status(400).json({ message: 'Invalid CVV' });
    }

    if (!cardHolderName || cardHolderName.trim() === '') {
      return res.status(400).json({ message: 'Cardholder name is required' });
    }

    console.log('Payment processed successfully');

    booking.paymentStatus = 'paid';
    booking.bookingStatus = 'confirmed';
    await booking.save();

    await Seat.updateMany(
      { bus: booking.bus, seatNumber: { $in: booking.seatNumbers } },
      { $set: { status: 'booked' } }
    );

    res.status(200).json({
      message: 'Payment successful. Booking confirmed.',
      booking: {
        _id: booking._id,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
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
