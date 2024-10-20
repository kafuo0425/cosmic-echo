const express = require("express");
const router = express.Router();
const logger = require("../utils/logger").logger;
const customerServiceController = require("../controllers/customerServiceController");
const { decodeToken } = require("../utils/tokenUtils"); // 确保正确引入 decodeToken

// 引入各个模块的路由
const courseRoutes = require("./courseRoutes");
const facebookWebhookRoutes = require("./facebookWebhook");
const personalizationWebhookRoutes = require("./personalizationWebhook");
const whatsappWebhookRoutes = require("./whatsappWebhook");
const appointmentRoutes = require("./appointmentRoutes");
const serviceRoutes = require("./serviceRoutes");

// 中间件：身份验证
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    try {
      req.user = decodeToken(token); // 解码令牌并设置用户信息
      next();
    } catch (error) {
      logger.error("Token decoding failed:", { error });
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// 挂载各个模块的路由
router.use("/courses", courseRoutes);
router.use("/facebook", facebookWebhookRoutes);
router.use("/personalization", personalizationWebhookRoutes);
router.use("/whatsapp", whatsappWebhookRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/services", serviceRoutes);

// 连接客服的路由
router.post("/connect-agent", authMiddleware, customerServiceController.requestHumanAgent); // 使用控制器的方法处理请求

// 默认根路由
router.get("/", (req, res) => {
  logger.info(`Root API accessed by IP: ${req.ip}, Method: ${req.method}`);
  res.status(200).send("Welcome to Cosmic Echo API");
});

// 404 处理：处理未定义的路由
router.use((req, res) => {
  logger.warn(`404 - Route not found: ${req.originalUrl}, IP: ${req.ip}`);
  res.status(404).json({ message: "Route not found" });
});

// 错误处理：捕获所有未处理的错误
router.use((err, req, res) => { // 去掉 next 参数
  logger.error(`Error occurred: ${err.message}, IP: ${req.ip}, Method: ${req.method}`);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;