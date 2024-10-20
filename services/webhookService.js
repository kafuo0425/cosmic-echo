/* eslint-disable no-console */
// services/webhookService.js

const logger = require("../utils/logger");

exports.processWebhookEvent = (eventType, eventPayload) => {
  try {
    switch (eventType) {
      case "facebook":
        logger.info("Processing Facebook event:", eventPayload);
        return handleFacebookEvent(eventPayload);
      case "whatsapp":
        logger.info("Processing WhatsApp event:", eventPayload);
        return handleWhatsAppEvent(eventPayload);
      case "custom":
        logger.info("Processing custom webhook event:", eventPayload);
        return handleCustomWebhook(eventPayload);
      default:
        logger.warn("Unrecognized Webhook type:", eventType);
        return { error: "Unknown webhook type" };
    }
  } catch (error) {
    logger.error("Failed to process webhook event:", error);
    throw new Error("Webhook processing failed");
  }
};

const handleFacebookEvent = (payload) => {
  logger.info("Handling Facebook Webhook event:", payload);
  return { message: "Facebook event processed", payload };
};

const handleWhatsAppEvent = (payload) => {
  logger.info("Handling WhatsApp Webhook event:", payload);
  return { message: "WhatsApp event processed", payload };
};

const handleCustomWebhook = (payload) => {
  logger.info("Handling custom Webhook event:", payload);
  return { message: "Custom webhook event processed", payload };
};
