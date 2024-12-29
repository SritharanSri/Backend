import Permit from '../models/Permit.js';
import Bus from '../models/Bus.js';
import Route from '../models/Route.js';


export const createPermit = async (req, res) => {
  try {
    const { permitType, expiryDate, bus, route, issuerName } = req.body;

    const existingBus = await Bus.findById(bus);
    if (!existingBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    const existingRoute = await Route.findById(route);
    if (!existingRoute) {
      return res.status(404).json({ message: 'Route not found' });
    }

    const permit = new Permit({
      permitType,
      expiryDate,
      bus,
      route,
      issuerName,
    });

    await permit.save();
    res.status(201).json(permit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPermits = async (req, res) => {
  try {
    const permits = await Permit.find().populate('bus route'); 
    res.status(200).json(permits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
