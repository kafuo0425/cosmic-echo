const express = require("express");
const router = express.Router();
const languageService = require("../services/languageService");
const logger = require("../utils/logger");
const welcomeMessages = require("../locales/welcomeMessages");
const Joi = require("joi");
const rateLimit = require("express-rate-limit");

// 限制每个 IP 的请求频率
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个 IP 限制100次请求
});

router.use("/webhook", limiter);

const webhookSchema = Joi.object({
  object: Joi.string().valid("page").required(),
  customerName: Joi.string().max(100).optional(), // 限制最大长度
});

router.post("/webhook", async (req, res) => {
  const body = req.body;

  try {
    const { error } = webhookSchema.validate(body);
    if (error) {
      logger.warn("Invalid request body:", error.details);
      return res.status(400).send({ message: "Invalid request body" });
    }

    const supportedLanguages = ["zh", "en", "es"];
    let lang = req.headers["accept-language"]?.toLowerCase(); // 确保语言为小写
    if (!supportedLanguages.includes(lang)) {
      lang = "zh";
    }
    languageService.setLanguage(lang);

    const customerName = body.customerName || "客户";
    const message = welcomeMessages.default_welcome.message.replace(
      "{{customerName}}",
      customerName,
    );

    if (body.object === "page") {
      // 验证 body.entry 的类型和长度
      if (!Array.isArray(body.entry) || body.entry.length === 0) {
        logger.warn("Invalid entry data:", body.entry);
        return res.status(400).send({ message: "Invalid entry data" });
      }

      logger.info("Facebook Messenger event received", {
        entries: body.entry.length,
        body: body, // 记录接收到的请求体
      });
      
      return res.status(200).json({
        subject: welcomeMessages.default_welcome.subject,
        message: message,
      });
    } else {
      return res.status(404).send({ message: "Unknown Webhook object type" });
    }
  } catch (error) {
    logger.error("Error processing chatbot Webhook:", { message: error.message, stack: error.stack });
    return res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;