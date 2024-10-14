// services/emotionService.js

const SentimentIntensityAnalyzer = require('vader-sentiment').SentimentIntensityAnalyzer;

// 分析情感
exports.analyzeEmotion = (message) => {
    const analyzer = new SentimentIntensityAnalyzer();
    
    // 使用 VADER 分析消息的情感极性
    const sentiment = analyzer.polarity_scores(message);
    
    // 根据复合得分返回情感类型
    if (sentiment['compound'] >= 0.05) {
        return 'happy'; // 正向情感
    } else if (sentiment['compound'] <= -0.05) {
        return 'sad'; // 负向情感
    } else {
        return 'neutral'; // 中性情感
    }
};