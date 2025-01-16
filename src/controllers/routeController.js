import Route from '../models/Route.js';

export const createRoute = async (req, res) => {
  try {
    const { name, startLocation, endLocation, distance, pricePerSeat } = req.body;

    const newRoute = new Route({
      name,
      startLocation,
      endLocation,
      distance,
      pricePerSeat
    });

    await newRoute.save();
    res.status(201).json({ message: 'Route created successfully', route: newRoute });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json({ message: 'Route updated successfully', route });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
