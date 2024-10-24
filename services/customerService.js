import logger from '../utils/logger';
import checkAgentSystem from '../external/checkAgentSystem';
import connectToHumanAgent from '../external/connectToHumanAgent';

export const checkAgentAvailability = async () => {
  try {
    const agentStatus = await checkAgentSystem();
    return agentStatus.isOnline;
  } catch (error) {
    logger.error("检查客服在线状态时出错:", error);
    return false; // 如果发生错误，返回离线状态
  }
};

export const connectToAgent = async (req, reason) => {
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