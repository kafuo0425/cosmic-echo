import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger';

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("User registration validation failed:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      res
        .status(201)
        .json({ message: "User registered successfully (feature disabled)" });
    } catch (error) {
      logger.error("User registration error:", error);
      res.status(400).json({ error: error.message });
    }
  },
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn("User login validation failed:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      res.status(200).json({ message: "Login successful (feature disabled)" });
    } catch (error) {
      logger.error("User login error:", error);
      res.status(400).json({ error: error.message });
    }
  },
);

export default router;