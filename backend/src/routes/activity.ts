import express from "express";
import { auth } from "../middleware/auth.ts";
import { logActivity } from "../controllers/activityControllers.ts";

const router = express.Router();

// All routes are protected with authentication
router.use(auth);

// Log a new activity
router.post("/", logActivity);

export default router;