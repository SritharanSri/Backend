import Bus from '../models/Bus.js';
import Seat from '../models/Seat.js';


export const createBus = async (req, res) => {
  try {
    const { busNumber, busType, availableSeats, status, pricePerSeat } = req.body;

    
    const newBus = new Bus({
      busNumber,
      busType,
      availableSeats, 
      status,
    });

    const savedBus = await newBus.save();

    
    const seats = [];
    for (let i = 1; i <= availableSeats; i++) {
      seats.push({
        seatNumber: `S${i}`, 
        bus: savedBus._id,
        status: 'available',
        price: pricePerSeat,
      });
    }

    
    await Seat.insertMany(seats);

    res.status(201).json({
      message: 'Bus created successfully and seats initialized',
      bus: savedBus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('route', 'name startLocation endLocation'); // Populating route details
    res.status(200).json(buses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('route', 'name startLocation endLocation');
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json({ message: 'Bus updated successfully', bus });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    
    await Seat.deleteMany({ bus: bus._id });

    res.status(200).json({ message: 'Bus and its seats deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
