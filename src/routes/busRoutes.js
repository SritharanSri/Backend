import express from "express";
import { authenticateUser, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, (req, res) => {
  res.send("All Buses - Accessible to authenticated users");
});

router.post(
  "/admin-only",
  authenticateUser,
  authorizeRoles(["admin"]),
  (req, res) => {
    res.send("Admin-only route - Accessible only to admins");
  }
);

export default router;
