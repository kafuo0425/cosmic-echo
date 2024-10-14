// controllers/userController.js

const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const { body, validationResult } = require('express-validator');
const logger = require("../utils/logger");

// 用户注册
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('User registration validation failed:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      logger.error('User registration error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// 用户登录
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('User login validation failed:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const token = await userService.loginUser(req.body);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      logger.error('User login error:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;