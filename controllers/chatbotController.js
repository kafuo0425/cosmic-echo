// controllers/chatbotController.js

const express = require("express");
const router = express.Router();
const personalizationService = require('../services/personalizationService');
const logger = require("../utils/logger");

// 处理 Webhook 请求
router.post('/webhook', async (req, res) => {
  const body = req.body;

  try {
    // 检查 Webhook 对象类型是否为 Facebook Messenger
    if (body.object === 'page') {
      // 处理每一个 entry 对象
      const entryPromises = body.entry.map(async (entry) => {
        const webhookEvent = entry.messaging && entry.messaging[0];

        if (!webhookEvent) {
          logger.warn('Invalid Facebook Messenger event structure', entry);
          return null;
        }

        logger.info('Facebook Messenger event:', webhookEvent);

        // 获取用户偏好或使用默认空数组
        const preferences = req.body.preferences || [];

        // 生成个性化回复
        const responseMessage = await personalizationService.generatePersonalizedResponse(
          webhookEvent.message && webhookEvent.message.text, 
          preferences
        );

        return responseMessage;  // 返回处理后的响应消息
      });

      // 等待所有消息处理完成并发送响应
      const responses = await Promise.all(entryPromises);
      res.status(200).send({ messages: responses.filter(Boolean) });  // 过滤掉可能为 null 的响应

    // 处理 WhatsApp Business Account 事件
    } else if (body.object === 'whatsapp_business_account') {
      logger.info('WhatsApp Business Account event:', body);
      res.status(200).send('EVENT_RECEIVED');

    // 处理未知的 Webhook 事件
    } else {
      logger.warn('Unknown Webhook object type:', body.object);
      res.sendStatus(404);
    }

  } catch (error) {
    // 捕获并记录错误
    logger.error('Error processing chatbot webhook:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;