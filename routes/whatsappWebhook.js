// routes/whatsappWebhook.js

const express = require("express");
const router = express.Router();
const { verifyWebhook } = require("../middlewares/verifyWebhook");
const whatsappController = require('../controllers/whatsappController');
const logger = require('../utils/logger');

// WhatsApp Webhook 验证
router.get('/webhook', verifyWebhook(process.env.WHATSAPP_VERIFY_TOKEN));

// 处理 WhatsApp 消息
router.post('/webhook', (req, res) => {
  try {
    whatsappController.receiveMessage(req, res);
  } catch (error) {
    logger.error('Error handling WhatsApp message:', error.message);
    res.status(500).send('Error handling message');
  }
});

module.exports = router;