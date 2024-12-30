import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import permitRoutes from "./routes/permitRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import searchRoutes  from './routes/searchRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/permits', permitRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/search", searchRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});



export default app;


