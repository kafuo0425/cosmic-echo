/* eslint-disable no-console */
// routes/api.js

const express = require("express");
const router = express.Router();
const logger = require("../utils/logger").logger;

// 引入各个模块的路由
const courseRoutes = require("./courseRoutes");
const facebookWebhookRoutes = require("./facebookWebhook");
const personalizationWebhookRoutes = require("./personalizationWebhook");
const whatsappWebhookRoutes = require("./whatsappWebhook");
const appointmentRoutes = require("./appointmentRoutes");
const serviceRoutes = require("./serviceRoutes");

// 挂载各个模块的路由
router.use("/courses", courseRoutes);
router.use("/facebook", facebookWebhookRoutes);
router.use("/personalization", personalizationWebhookRoutes);
router.use("/whatsapp", whatsappWebhookRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/services", serviceRoutes);

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
router.use((err, req, res, _next) => {
  logger.error(
    `Error occurred: ${err.message}, IP: ${req.ip}, Method: ${req.method}`,
  );
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
