import webhookService from '../services/webhookService';
import logger from '../utils/logger';
import xss from 'xss';

export const receiveMessage = (req, res) => {
  try {
    const eventPayload = req.body;

    let result = webhookService.processWebhookEvent("whatsapp", eventPayload);

    result = xss(result);

    res.status(200).send(result);
  } catch (error) {
    logger.error("Error processing WhatsApp Webhook message:", error);
    res.status(500).send({ error: "Failed to process Webhook" });
  }
};