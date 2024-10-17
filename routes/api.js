// routes/api.js

const express = require("express");
const router = express.Router();
const logger = require('../utils/logger');

// 引入各个模块的路由
const courseRoutes = require('./courseRoutes');
const facebookWebhookRoutes = require('./facebookWebhook');
const personalizationWebhookRoutes = require('./personalizationWebhook');
const whatsappWebhookRoutes = require('./whatsappWebhook');

// 挂载各个模块的路由
router.use('/courses', courseRoutes);  // 课程相关路由
router.use('/facebook', facebookWebhookRoutes);  // Facebook Webhook
router.use('/personalization', personalizationWebhookRoutes);  // 个性化 Webhook
router.use('/whatsapp', whatsappWebhookRoutes);  // WhatsApp Webhook

// 默认路由
router.get('/', (req, res) => {
  logger.info('Root API accessed');
  res.status(200).send('Welcome to Cosmic Echo API');
});

module.exports = router;