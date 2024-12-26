import express from "express";
import { authorizeRoles } from "./middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/admin-only",
  authorizeRoles(["admin"]),
  (req, res) => {
    res.json({ message: "This route is restricted to admins." });
  }
);

export default router;
