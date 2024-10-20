/* eslint-disable no-console */
// services/intentService.js

const logger = require("../utils/logger");
const compromise = require("compromise");
const { detectLanguage } = require("./languageService");
const sentiment = require("sentiment");

const intentLibrary = {
  zh: {
    greeting: ["你好", "早上好", "下午好", "晚上好", "嗨", "您好"],
    farewell: ["再见", "拜拜", "下次见", "保重"],
    appointment: ["预约", "预定", "安排"],
    support: ["帮助", "支持", "问题", "协助"],
    pricing: ["价格", "费用", "收费"],
    realPersonRequest: ["人工客服", "客服", "真人", "人工"],
    courseInfo: ["课程", "培训", "工作坊"],
    emotionAnalysis: ["情感", "情绪", "行为", "分析"],
    encouragement: ["犹豫", "不确定", "需要更多时间"],
  },
  en: {
    greeting: ["hello", "hi", "hey"],
    farewell: ["bye", "goodbye", "see you"],
    appointment: ["schedule", "book", "appointment"],
    support: ["help", "support", "issue"],
    pricing: ["price", "cost", "fees"],
    realPersonRequest: ["real person", "agent", "human"],
    courseInfo: ["course", "class", "session"],
    emotionAnalysis: ["emotion", "feeling", "behavior"],
    encouragement: ["still thinking", "considering", "not decided"],
  },
};

const processMessage = (message) => {
  const lowerMessage = message.toLowerCase();
  const doc = compromise(lowerMessage).normalize();
  return doc.text();
};

const detectSentiment = (message) => {
  const result = sentiment(message);
  return result;
};

exports.detectIntent = (message) => {
  const processedMessage = processMessage(message);
  // TODO: 检查此处的对象注入漏洞
  const detectedLanguage = detectLanguage(processedMessage);
  const intents = intentLibrary[detectedLanguage] || intentLibrary["en"];

  logger.info(
    `Detecting intent for message in ${detectedLanguage}:`,
    processedMessage,
  );

  const detectedIntents = [];

  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some((keyword) => processedMessage.includes(keyword))) {
      logger.info(`Intent detected: ${intent}`);
      detectedIntents.push(intent);
    }
  }

  const sentimentResult = detectSentiment(processedMessage);
  logger.info("Sentiment analysis result:", sentimentResult);

  if (detectedIntents.length === 0) {
    logger.warn('No intent detected, returning "unknown"');
    return "unknown";
  }

  if (detectedIntents.length > 1) {
    if (sentimentResult.score < 0) {
      if (detectedIntents.includes("support")) {
        return "support";
      } else if (detectedIntents.includes("realPersonRequest")) {
        return "realPersonRequest";
      }
    }
  }

  return detectedIntents[0];
};
