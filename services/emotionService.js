const SentimentIntensityAnalyzer = require("vader-sentiment").SentimentIntensityAnalyzer;
import logger from '../utils/logger';

export const analyzeEmotion = (message) => {
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