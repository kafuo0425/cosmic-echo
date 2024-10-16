// controllers/whatsappController.js

const webhookService = require('../services/webhookService');
const logger = require('../utils/logger');

exports.receiveMessage = (req, res) => {
    try {
        const eventPayload = req.body;
        const result = webhookService.processWebhookEvent('whatsapp', eventPayload);
        res.status(200).send(result);
    } catch (error) {
        logger.error('Error processing WhatsApp Webhook message:', error);
        res.status(500).send({ error: 'Failed to process Webhook' });
    }
};