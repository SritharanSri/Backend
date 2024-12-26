import Bus from '../models/Bus.js';

// Create a new bus
export const createBus = async (req, res) => {
  try {
    const { busNumber, busType, capacity, route, status } = req.body;

    const newBus = new Bus({
      busNumber,
      busType,
      capacity,
      route,
      status,
    });

    await newBus.save();
    res.status(201).json({ message: 'Bus created successfully', bus: newBus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all buses
export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('route', 'name startLocation endLocation'); // Populating route details
    res.status(200).json(buses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single bus by ID
export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('route', 'name startLocation endLocation');
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a bus
export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json({ message: 'Bus updated successfully', bus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a bus
export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
