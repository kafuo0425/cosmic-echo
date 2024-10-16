// routes/personalizationWebhook.js

const express = require("express");
const router = express.Router();
const personalizationController = require("../controllers/personalizationController");
const logger = require('../utils/logger');

// 处理个性化 Webhook 请求
router.post('/', (req, res) => {
  try {
    personalizationController.getPersonalizedMessage(req, res);
  } catch (error) {
    logger.error('Error handling personalization request:', error.message);
    res.status(500).send('Error handling personalization request');
  }
});

module.exports = router;