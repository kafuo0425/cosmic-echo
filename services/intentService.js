// services/intentService.js

const logger = require('../utils/logger');
const compromise = require('compromise');
const { detectLanguage } = require('./languageService');
const sentiment = require('sentiment');

const intentLibrary = {
    'zh': {
        'greeting': ['你好', '早上好', '下午好', '晚上好', '嗨', '您好', '问好', '哈喽', '嗨嗨', '您好呀'],
        'farewell': ['再见', '拜拜', '下次见', '保重', '走了', '再联络', '告别', '拜', '回见'],
        'appointment': ['预约', '预定', '安排', '预订', '预先安排', '预排', '预留', '确认时间', '订位', '时间表'],
        'support': ['帮助', '支持', '问题', '协助', '疑问', '需要帮助', '请帮忙', '麻烦', '求助'],
        'pricing': ['价格', '费用', '收费', '多少钱', '报价', '收费标准', '费用多少', '如何收费', '价钱', '定价'],
        'realPersonRequest': ['人工客服', '客服', '真人', '人工', '找人处理', '联系真人', '人手服务'],
        'courseInfo': ['课程', '培训', '工作坊', '研讨会', '班级', '学习班', '上课', '课程安排', '课程表'],
        'emotionAnalysis': ['情感', '情绪', '行为', '分析', '宠物情感', '宠物行为', '心理健康', '情绪分析'],
        'encouragement': ['还在考虑', '犹豫', '不确定', '需要更多时间', '再想想', '没有决定', '暂时不确定']
    },
    'en': {
        'greeting': ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
        'farewell': ['bye', 'goodbye', 'see you', 'take care'],
        'appointment': ['schedule', 'book', 'appointment', 'meeting', 'reserve', 'reservation', 'arrange session', 'consult'],
        'support': ['help', 'support', 'issue', 'problem', 'assistance', 'trouble', 'guidance', 'question'],
        'pricing': ['price', 'cost', 'fees', 'charges', 'rate', 'pricing', 'how much', 'quote', 'price for service', 'payment', 'cost estimation'],
        'realPersonRequest': ['real person', 'agent', 'human', 'customer service', 'talk to human', 'talk to agent'],
        'courseInfo': ['course', 'class', 'session', 'workshop', 'seminar', 'training', 'lesson', 'details on class', 'schedule course'],
        'emotionAnalysis': ['emotion', 'feeling', 'behavior', 'analysis', 'pet behavior', 'pet emotion', 'emotional health', 'animal behavior', 'feeling analysis'],
        'encouragement': ['still thinking', 'considering', 'not decided', 'need more time', 'unsure', 'couldn’t decide', 'need to know more']
    }
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
    const detectedLanguage = detectLanguage(processedMessage);
    const intents = intentLibrary[detectedLanguage] || intentLibrary['en'];

    logger.info(`Detecting intent for message in ${detectedLanguage}:`, processedMessage);

    let detectedIntents = [];

    for (const [intent, keywords] of Object.entries(intents)) {
        if (keywords.some(keyword => processedMessage.includes(keyword))) {
            logger.info(`Intent detected: ${intent}`);
            detectedIntents.push(intent);
        }
    }

    const sentimentResult = detectSentiment(processedMessage);
    logger.info('Sentiment analysis result:', sentimentResult);

    if (detectedIntents.length === 0) {
        logger.warn('No intent detected, returning "unknown"');
        return 'unknown';
    }

    if (detectedIntents.length > 1) {
        if (sentimentResult.score < 0) {
            if (detectedIntents.includes('support')) {
                return 'support';
            } else if (detectedIntents.includes('realPersonRequest')) {
                return 'realPersonRequest';
            }
        }
        return detectedIntents[0];
    }

    return detectedIntents[0];
};