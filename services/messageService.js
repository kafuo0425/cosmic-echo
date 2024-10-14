// services/messageService.js

const languageService = require("./languageService");
const intentService = require("./intentService");
const emotionService = require("./emotionService");

// 消息处理服务模块
exports.processMessage = async (message) => {
    try {
        // 检测消息的语言
        const language = languageService.detectLanguage(message);

        // 检测消息的意图
        const intent = intentService.detectIntent(message);

        // 分析消息的情感
        const emotion = emotionService.analyzeEmotion(message);

        // 返回处理后的结果
        return { language, intent, emotion };
    } catch (error) {
        console.error("Error processing message:", error);
        throw new Error("Message processing failed");
    }
};