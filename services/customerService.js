// services/customerService.js

const logger = require('../utils/logger');

// 检查客服是否在线
exports.checkAgentAvailability = async () => {
    try {
        const agentStatus = await checkAgentSystem();
        return agentStatus.isOnline;
    } catch (error) {
        logger.error("检查客服在线状态时出错:", error);
        return false;  // 如果发生错误，返回离线状态
    }
};

// 连接到真人客服
exports.connectToAgent = async (userId, reason) => {
    try {
        const agentDetails = await connectToHumanAgent(userId, reason);
        return agentDetails;
    } catch (error) {
        logger.error('Error connecting to human agent:', { error, userId });
        throw new Error('Failed to connect to a human agent');
    }
};