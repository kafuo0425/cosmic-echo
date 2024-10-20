/* eslint-disable no-console */
// services/messageService.js

const languageService = require("./languageService");
const intentService = require("./intentService");
const emotionService = require("./emotionService");

exports.processMessage = async (message) => {
  try {
    const language = languageService.detectLanguage(message);
    const intent = intentService.detectIntent(message);
    const emotion = emotionService.analyzeEmotion(message);

    return { language, intent, emotion };
  } catch (error) {
    console.error("Error processing message:", error);
    throw new Error("Message processing failed");
  }
};
