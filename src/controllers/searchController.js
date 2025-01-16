  import Route from '../models/Route.js';
  import Permit from '../models/Permit.js';
  import Seat from '../models/Seat.js';
  
  export const searchBuses = async (req, res) => {
    try {
      const { travelDate, startPlace, endPlace } = req.body;
  
      if (!travelDate || !startPlace || !endPlace) {
        return res.status(400).json({ message: 'Please provide travelDate, startPlace, and endPlace.' });
      }
  
      const travelDateObj = new Date(travelDate);
      if (isNaN(travelDateObj)) {
        return res.status(400).json({ message: 'Invalid travel date provided.' });
      }
  
      const route = await Route.findOne({ startLocation: startPlace, endLocation: endPlace });
      if (!route) {
        return res.status(404).json({ message: 'No route found for the given start and end points' });
      }
  
      const currentDate = new Date();
      const permits = await Permit.find({
        route: route._id,
        expiryDate: { $gte: currentDate }, 
      }).populate('bus');
  
      if (!permits || permits.length === 0) {
        return res.status(404).json({ message: 'No valid permits found for the selected route' });
      }
  
      
      const availableBuses = [];
      for (const permit of permits) {
        const bus = permit.bus;
        if (!bus) {
          continue; 
        }
  
        const availableSeats = await Seat.find({
          bus: bus._id,
          status: 'available'
        });
  
        if (availableSeats.length > 0) {
          availableBuses.push({
            busId: bus._id,
            number: bus.number,
            pricePerSeat: route.pricePerSeat, 
            availableSeats: availableSeats,
          });
        }
      }
  
      if (availableBuses.length === 0) {
        return res.status(404).json({ message: 'No buses available for the selected date and route' });
      }
  
      res.status(200).json({
        route: {
          startPlace: route.startLocation,
          endPlace: route.endLocation,
        },
        travelDate,
        availableBuses,
      });
    } catch (error) {
      
      console.error(error); 
      res.status(500).json({ message: 'Something went wrong, please try again later.' });
    }
  };
  

  