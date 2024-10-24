import express from 'express';
const router = express.Router();
const logger = require("../utils/logger").logger;
import customerServiceController from '../controllers/customerServiceController';
import { decodeToken } from '../utils/tokenUtils';
import courseRoutes from './courseRoutes';
import facebookWebhookRoutes from './facebookWebhook';
import personalizationWebhookRoutes from './personalizationWebhook';
import whatsappWebhookRoutes from './whatsappWebhook';
import appointmentRoutes from './appointmentRoutes';
import serviceRoutes from './serviceRoutes';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    try {
      req.user = decodeToken(token); 
      next();
    } catch (error) {
      logger.error("Token decoding failed:", { error });
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.use("/courses", courseRoutes);
router.use("/facebook", facebookWebhookRoutes);
router.use("/personalization", personalizationWebhookRoutes);
router.use("/whatsapp", whatsappWebhookRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/services", serviceRoutes);

router.post("/connect-agent", authMiddleware, customerServiceController.requestHumanAgent);

router.get("/", (req, res) => {
  logger.info(`Root API accessed by IP: ${req.ip}, Method: ${req.method}`);
  res.status(200).send("Welcome to Cosmic Echo API");
});

router.use((req, res) => {
  logger.warn(`404 - Route not found: ${req.originalUrl}, IP: ${req.ip}`);
  res.status(404).json({ message: "Route not found" });
});

// 错误处理：Express 错误处理中保持 `next` 参数
router.use((err, req, res, _next) => { 
  logger.error(`Error occurred: ${err.message}, IP: ${req.ip}, Method: ${req.method}`);
  res.status(500).json({ message: "Internal Server Error" });
});

export default router;