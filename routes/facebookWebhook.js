// routes/facebookWebhook.js

const express = require("express");
const router = express.Router();
const facebookController = require("../controllers/facebookController");
const { verifyWebhook } = require("../middlewares/verifyWebhook");
const logger = require('../utils/logger');

// Facebook Webhook 验证
router.get('/webhook', verifyWebhook(process.env.FACEBOOK_VERIFY_TOKEN));

// Facebook 消息处理
router.post('/webhook', (req, res, next) => {
  try {
    facebookController.handleMessage(req, res);
  } catch (error) {
    logger.error('Error handling Facebook message:', error.message);
    res.status(500).send('Error handling message');
  }
});

module.exports = router;