// utils/logger.js

const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');  // 引入日志轮转插件

// 定义日志格式，包含时间戳、日志级别、消息、错误堆栈（如存在）
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack || ''}`;
});

// 定义自定义日志级别
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// 定义开发和生产环境的日志输出格式
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),  // 捕获并输出错误堆栈
  logFormat
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  logFormat
);

// 配置文件日志轮转
const fileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '../logs/%DATE%-app.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',  // 每个日志文件最大 20MB
  maxFiles: '14d',  // 只保留最近 14 天的日志
  level: 'info',
});

// 错误日志单独保存
const errorTransport = new winston.transports.File({
  filename: path.join(__dirname, '../logs/error.log'),
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat
  ),
});

// 判断当前环境
const isProduction = process.env.NODE_ENV === 'production';

// 创建 winston 日志记录器
const logger = winston.createLogger({
  levels,  // 使用自定义日志级别
  format: isProduction ? prodFormat : devFormat,
  transports: [
    fileTransport,  // 日志文件轮转
    errorTransport,  // 错误日志文件
    new winston.transports.Console({  // 控制台输出（仅在开发环境）
      level: isProduction ? 'error' : 'debug',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/rejections.log') })
  ],
  exitOnError: false,  // 当未捕获的异常出现时，避免退出进程
});

// 捕获未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// 捕获未处理的异常
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});

// 导出 logger 模块
module.exports = logger;