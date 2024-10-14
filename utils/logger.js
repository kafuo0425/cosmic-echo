const winston = require('winston');
const path = require('path');

// 定义日志格式
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// 配置 winston 日志记录器
const logger = winston.createLogger({
  level: 'info',  // 默认日志级别
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/app.log') }),  // 保存日志到文件
    new winston.transports.Console()  // 输出到控制台
  ]
});

// 不需要手动重写 logger.error, logger.info 和 logger.warn 方法，直接使用 winston 提供的默认方法

module.exports = logger;
