// routes/whatsappWebhook.js

const express = require("express");
const router = express.Router();
const { verifyWebhook } = require("../middlewares/verifyWebhook");
const whatsappController = require('../controllers/whatsappController');

// WhatsApp Webhook 验证
router.get('/webhook', verifyWebhook(process.env.WHATSAPP_VERIFY_TOKEN));

// 处理 WhatsApp 消息
router.post('/webhook', whatsappController.handleMessage);

module.exports = router;