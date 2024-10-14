// routes/whatsappWebhook.js

const express = require("express");
const router = express.Router();
const { verifyWebhook } = require("../middlewares/verifyWebhook");
const whatsappController = require('../controllers/whatsappController');

// WhatsApp Webhook 验证
router.get('/webhook', (req, res) => {
  console.log('Received Webhook verification request');  // 添加日志调试
  verifyWebhook(process.env.WHATSAPP_VERIFY_TOKEN)(req, res);
});

// 处理 WhatsApp 消息
router.post('/webhook', (req, res) => {
  console.log('Received WhatsApp message request');
  whatsappController.receiveMessage(req, res);
});

module.exports = router;
