const logger = require("../utils/logger");

// 假设这两个函数已定义在其他地方
const checkAgentSystem = require("../external/checkAgentSystem"); 
const connectToHumanAgent = require("../external/connectToHumanAgent"); 

/**
 * 检查客服在线状态
 * @returns {Promise<boolean>} 在线状态
 */
exports.checkAgentAvailability = async () => {
  try {
    const agentStatus = await checkAgentSystem();
    return agentStatus.isOnline;
  } catch (error) {
    logger.error("检查客服在线状态时出错:", error);
    return false; // 如果发生错误，返回离线状态
  }
};

/**
 * 将用户连接到客服
 * @param {Object} req - Express 请求对象
 * @param {string} reason - 连接客服的原因
 * @returns {Promise<Object>} 客服的详细信息
 */
exports.connectToAgent = async (req, reason) => {
  // 从请求对象中提取 userId
  const userId = req.user ? req.user.id : null; // 确保 userId 是有效的

  // 检查 userId 是否有效
  if (!userId) {
    logger.error("无效的 userId，无法连接到客服。");
    throw new Error("无效的用户身份信息");
  }

  try {
    const agentDetails = await connectToHumanAgent(userId, reason);
    return agentDetails;
  } catch (error) {
    logger.error("连接客服时出错:", { error, userId });
    throw new Error("连接客服失败");
  }
};