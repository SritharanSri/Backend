import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import busRoutes from "./routes/busRoutes.js";
//import routeRoutes from "./routes/routeRoutes.js";
//import reservationRoutes from "./routes/bookingRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
//app.use("/api/routes", routeRoutes);
//app.use("/api/reservations", reservationRoutes);
app.use("/api/assignments", assignmentRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Server Configuration
/*const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/

export default app;


/*import express from 'express';

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World! 🚀');
});

export default app;*/