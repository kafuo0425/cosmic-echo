// controllers/customerServiceController.js

const customerService = require('../services/customerService');
const logger = require('../utils/logger');

exports.requestHumanAgent = async (req, res) => {
    try {
        const { userId, reason } = req.body;

        if (!userId || !reason) {
            logger.warn('Missing userId or reason for human agent request', { userId, reason });
            return res.status(400).send({ error: 'UserId and reason are required' });
        }

        const isAgentAvailable = await customerService.checkAgentAvailability();

        if (isAgentAvailable) {
            const agentDetails = await customerService.connectToAgent(userId, reason);
            logger.info('Connected user to human agent', { userId, agentDetails });
            res.status(200).send({ message: 'Connected to a human agent', agent: agentDetails });
        } else {
            logger.warn('No human agents available', { userId });
            res.status(503).send({ error: 'No human agents available at the moment. Please try again later.' });
        }
    } catch (error) {
        logger.error('Error connecting user to human agent:', { error, userId });
        res.status(500).send({ error: 'Internal server error' });
    }
};