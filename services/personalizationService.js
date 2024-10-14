// services/personalizationService.js

const logger = require('../utils/logger');
const emotionService = require('./emotionService');

// 根据用户偏好、情感生成个性化消息
exports.generatePersonalizedResponse = async (message, preferences, userId) => {
  try {
    // 分析用户消息的情感
    const userEmotion = emotionService.analyzeEmotion(message);
    
    logger.info('User emotion detected:', { userEmotion, userId });

    // 基于情感状态和用户偏好生成不同类型的回复
    let personalizedMessage;
    if (userEmotion === 'happy' || userEmotion === 'joy') {
      personalizedMessage = `Hello ${userId}, glad to see you're feeling positive! Based on your preferences: ${JSON.stringify(preferences)}`;
    } else if (userEmotion === 'sad' || userEmotion === 'anger') {
      personalizedMessage = `Hello ${userId}, it seems like you're feeling down. Here's something that might help: ${JSON.stringify(preferences)}`;
    } else {
      personalizedMessage = `Hello ${userId}, how can we assist you today? Based on your preferences: ${JSON.stringify(preferences)}`;
    }

    return personalizedMessage;
  } catch (error) {
    logger.error('Error generating personalized response:', { error, userId });
    throw new Error('Failed to generate personalized message');
  }
};
