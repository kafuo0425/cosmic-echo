// middlewares/verifyWebhook.js

const logger = require('../utils/logger');

// Webhook 验证中间件
function verifyWebhook(verifyToken) {
  return (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // 验证模式和 token 是否匹配
    if (mode && token === verifyToken) {
      logger.info(`Webhook verified successfully with token: ${token}, mode: ${mode}`);
      res.status(200).send(challenge);
    } else {
      logger.warn(`Webhook verification failed. Mode: ${mode}, Token: ${token}`);
      res.status(403).send('Forbidden');
    }
  };
}

module.exports = { verifyWebhook };