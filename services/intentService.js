// services/intentService.js

// 检测意图
exports.detectIntent = (message) => {
    const intents = {
        'greeting': ['hello', 'hi', 'hey'],
        'farewell': ['bye', 'goodbye', 'see you'],
        'appointment': ['schedule', 'book', 'appointment', 'meeting'],
        'support': ['help', 'support', 'issue', 'problem']
    };

    // 转换消息为小写，避免区分大小写
    const lowerMessage = message.toLowerCase();

    // 遍历意图和相关的关键词，检测是否匹配
    for (const [intent, keywords] of Object.entries(intents)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
            return intent; // 返回匹配到的意图
        }
    }

    return 'unknown'; // 如果没有匹配的意图，返回 'unknown'
};