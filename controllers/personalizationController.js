// controllers/personalizationController.js

const personalizationService = require('../services/personalizationService');
const { detectLanguageAndNotify } = require('../services/languageService');
const logger = require('../utils/logger');

exports.getPersonalizedMessage = async (req, res) => {
    try {
        const { preferences, userId, message } = req.body;

        // 检测语言并提醒用户
        const lang = detectLanguageAndNotify(message, res);

        if (lang === 'zh') {
            const personalizedMessage = await personalizationService.generatePersonalizedResponse(preferences, userId);
            res.status(200).json({ message: personalizedMessage });
        } else {
            res.status(400).json({ message: '个性化服务目前仅以中文提供，请切换至中文进行交流。' });
        }
    } catch (error) {
        logger.error('Error processing personalized message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
