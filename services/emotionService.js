const SentimentIntensityAnalyzer = require("vader-sentiment").SentimentIntensityAnalyzer;
const logger = require("../utils/logger");

/**
 * 分析消息的情感倾向
 * @param {string} message - 要分析的消息
 * @returns {string} - 情感倾向（joy, happy, anger, sad, neutral）
 */
exports.analyzeEmotion = (message) => {
  const analyzer = new SentimentIntensityAnalyzer();
  const sentiment = analyzer.polarity_scores(message);
  logger.info("Sentiment analysis result:", { sentiment });

  const compoundScore = sentiment["compound"];

  if (compoundScore >= 0.7) {
    return "joy";
  } else if (compoundScore >= 0.05) {
    return "happy";
  } else if (compoundScore <= -0.7) {
    return "anger";
  } else if (compoundScore <= -0.05) {
    return "sad";
  } else {
    return "neutral";
  }
};