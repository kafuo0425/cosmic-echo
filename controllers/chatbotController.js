// controllers/chatbotController.js

const express = require("express");
const router = express.Router();
const personalizationService = require('../services/personalizationService');
const languageService = require('../services/languageService');
const logger = require("../utils/logger");
const welcomeMessages = require('../locales/welcomeMessages'); // 动态消息模板

router.post('/webhook', async (req, res) => {
  const body = req.body;

  try {
    const lang = req.headers['accept-language'] || 'zh'; // 优先中文
    languageService.setLanguage(lang);

    const customerName = body.customerName || '客户';
    const message = welcomeMessages.default_welcome.message.replace('{{customerName}}', customerName);

    if (body.object === 'page') {
      logger.info('Facebook Messenger event received', { entries: body.entry.length });
      res.status(200).send({
        subject: welcomeMessages.default_welcome.subject,
        message: message
      });
    } else {
      res.status(404).send({ message: 'Unknown Webhook object type' });
    }
  } catch (error) {
    logger.error('处理聊天机器人 Webhook 时出错:', error);
    res.status(500).send({ error: '内部服务器错误' });
  }
});

module.exports = router;