// controllers/facebookController.js

const webhookService = require('../services/webhookService');
const logger = require('../utils/logger');

exports.handleMessage = (req, res) => {
    try {
        const eventPayload = req.body;
        const result = webhookService.processWebhookEvent('facebook', eventPayload);
        res.status(200).send(result);
    } catch (error) {
        logger.error('Error processing Facebook Webhook message:', error);
        res.status(500).send({ error: 'Failed to process Webhook' });
    }
};