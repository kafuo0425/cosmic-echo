/* eslint-disable no-console */
// middlewares/verifyWebhook.js

const logger = require("../utils/logger");
const xss = require("xss"); // 用于输出转义

// Webhook 验证中间件
function verifyWebhook(verifyToken) {
  return (req, res) => {
    try {
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      let challenge = req.query["hub.challenge"];

      // 验证模式和 token 是否匹配
      if (mode && token === verifyToken) {
        logger.info(
          `Webhook verified successfully. Mode: ${mode}, Token: ${token}, IP: ${req.ip}`,
        );

        // 对 challenge 进行校验和转义，防止 XSS 攻击
        if (!challenge || typeof challenge !== "string") {
          logger.warn("Invalid challenge parameter.");
          return res.status(400).send("Bad Request");
        }

        challenge = xss(challenge); // 防止 XSS 攻击
        res.status(200).send(challenge);
      } else {
        // 记录详细的失败日志
        logger.warn(
          `Webhook verification failed. Mode: ${mode}, Token: ${token}, IP: ${req.ip}`,
        );
        res.status(403).send("Forbidden");
      }
    } catch (error) {
      // 捕获潜在错误并记录日志
      logger.error("Error occurred during webhook verification", {
        error,
        ip: req.ip,
      });
      res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = verifyWebhook;
