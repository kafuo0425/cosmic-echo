// services/emotionService.js

const SentimentIntensityAnalyzer = require('vader-sentiment').SentimentIntensityAnalyzer;
const logger = require('../utils/logger');

exports.analyzeEmotion = (message) => {
    const analyzer = new SentimentIntensityAnalyzer();
    const sentiment = analyzer.polarity_scores(message);
    logger.info('Sentiment analysis result:', { sentiment });

    if (sentiment['compound'] >= 0.7) {
        return 'joy';
    } else if (sentiment['compound'] >= 0.05) {
        return 'happy';
    } else if (sentiment['compound'] <= -0.7) {
        return 'anger';
    } else if (sentiment['compound'] <= -0.05) {
        return 'sad';
    } else {
        return 'neutral';
    }
};