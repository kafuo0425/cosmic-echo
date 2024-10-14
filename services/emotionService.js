// services/emotionService.js

const SentimentIntensityAnalyzer = require('vader-sentiment').SentimentIntensityAnalyzer;
const logger = require('../utils/logger');

// 分析情感，并支持多种情感分类
exports.analyzeEmotion = (message) => {
    const analyzer = new SentimentIntensityAnalyzer();

    // 使用 VADER 分析消息的情感极性
    const sentiment = analyzer.polarity_scores(message);

    logger.info('Sentiment analysis result:', { sentiment });

    // 扩展情感分类
    if (sentiment['compound'] >= 0.7) {
        return 'joy';  // 强烈的正向情感
    } else if (sentiment['compound'] >= 0.05) {
        return 'happy';  // 正向情感
    } else if (sentiment['compound'] <= -0.7) {
        return 'anger';  // 强烈的负向情感
    } else if (sentiment['compound'] <= -0.05) {
        return 'sad';  // 负向情感
    } else {
        return 'neutral';  // 中性情感
    }
};
