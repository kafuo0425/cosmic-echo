/* eslint-disable no-console */
// controllers/chatbotController.js

const express = require("express");
const router = express.Router();
const languageService = require("../services/languageService");
const logger = require("../utils/logger");
const welcomeMessages = require("../locales/welcomeMessages");
const Joi = require("joi");

const webhookSchema = Joi.object({
  object: Joi.string().valid("page").required(),
  customerName: Joi.string().optional(),
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
    let lang = req.headers["accept-language"];
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
      logger.info("Facebook Messenger event received", {
        entries: body.entry.length,
      });
      res.status(200).send({
        subject: welcomeMessages.default_welcome.subject,
        message: message,
      });
    } else {
      res.status(404).send({ message: "Unknown Webhook object type" });
    }
  } catch (error) {
    logger.error("Error processing chatbot Webhook:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
