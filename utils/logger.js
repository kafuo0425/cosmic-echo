/* eslint-disable no-console */
// utils/logger.js

const winston = require("winston");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const async_hooks = require("async_hooks");
const asyncLocalStorage = new async_hooks.AsyncLocalStorage();
const fs = require("fs");

// 确保日志目录存在
const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// 定义日志格式
const logFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    const context = asyncLocalStorage.getStore();
    const requestId = context ? context.requestId : "N/A";
    return `${timestamp} [${level.toUpperCase()}] [Request ID: ${requestId}] ${message} ${stack || ""}`;
  },
);

// 配置日志格式和文件保存
const logger = winston.createLogger({
  level: "info", // 设置默认日志等级为 info
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // 简化控制台输出格式
    new winston.transports.File({
      filename: path.join(logsDir, "app.log"),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }), // 限制日志文件大小和保留数量
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "rejections.log"),
    }), // 捕获未处理的Promise拒绝
  ],
});

// 捕获请求 ID 和日志记录
const expressLogger = (req, res, next) => {
  const requestId = req.headers["x-request-id"] || uuidv4();
  asyncLocalStorage.run({ requestId }, () => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    res.on("finish", () => {
      logger.info(`Request completed: ${req.method} ${req.url}`);
    });
    next();
  });
};

module.exports = { logger, expressLogger };
