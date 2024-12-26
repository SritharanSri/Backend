const Assignment = require("../models/Assignment");
const Bus = require("../models/Bus");
const Route = require("../models/Route");

// Assign a bus to a route
const assignBusToRoute = (req, res) => {
  const { busId, routeId } = req.body;
  const userId = req.user.id;

  Promise.all([Bus.findById(busId), Route.findById(routeId)])
    .then(([bus, route]) => {
      if (!bus) return res.status(404).json({ error: "Bus not found" });
      if (!route) return res.status(404).json({ error: "Route not found" });

      return Assignment.findOne({ bus: busId, route: routeId }).then((existingAssignment) => {
        if (existingAssignment)
          return res.status(400).json({ error: "Bus is already assigned to this route" });

        const newAssignment = new Assignment({
          bus: busId,
          route: routeId,
          assignedBy: userId,
        });

        return newAssignment.save();
      });
    })
    .then((assignment) => res.status(201).json({ message: "Bus assigned successfully", assignment }))
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Get all assignments
const getAllAssignments = (req, res) => {
  Assignment.find()
    .populate("bus")
    .populate("route")
    .populate("assignedBy", "username")
    .then((assignments) => res.status(200).json(assignments))
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Remove an assignment
const removeAssignment = (req, res) => {
  const { assignmentId } = req.params;

  Assignment.findByIdAndDelete(assignmentId)
    .then((assignment) => {
      if (!assignment) return res.status(404).json({ error: "Assignment not found" });
      res.status(200).json({ message: "Assignment removed successfully" });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

module.exports = { assignBusToRoute, getAllAssignments, removeAssignment };
