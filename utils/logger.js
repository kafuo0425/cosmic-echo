const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file'); // 引入日志轮转插件
const Sentry = require('@sentry/node'); // 引入 Sentry 进行错误监控
const morgan = require('morgan'); // 用于 HTTP 请求日志记录
const async_hooks = require('async_hooks'); // 用于捕获异步上下文（如 request ID）
const { v4: uuidv4 } = require('uuid'); // 引入 UUID 生成器
const express = require('express');
const app = express(); // 确保定义了 app

// Sentry 配置
Sentry.init({ dsn: process.env.SENTRY_DSN });

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

// 判断当前环境
const isProduction = process.env.NODE_ENV === 'production';

// 获取日志级别，优先使用环境变量配置
const logLevel = process.env.LOG_LEVEL || (isProduction ? 'error' : 'debug');

// 定义开发和生产环境的日志输出格式
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }), // 捕获并输出错误堆栈
  logFormat
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json() // 生产环境使用 JSON 格式
);

// 配置文件日志轮转
const fileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '../logs/%DATE%-app.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m', // 每个日志文件最大 20MB
  maxFiles: '14d', // 只保留最近 14 天的日志
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

// 其他级别的日志分开处理
const debugTransport = new winston.transports.File({
  filename: path.join(__dirname, '../logs/debug.log'),
  level: 'debug',
});

const httpTransport = new winston.transports.File({
  filename: path.join(__dirname, '../logs/http.log'),
  level: 'http',
});

// 创建 logger 实例
const logger = winston.createLogger({
  levels, // 使用自定义日志级别
  format: isProduction ? prodFormat : devFormat,
  transports: [
    fileTransport, // 日志文件轮转
    errorTransport, // 错误日志文件
    debugTransport, // 调试日志
    httpTransport, // HTTP日志
    new winston.transports.Console({ // 控制台输出
      level: logLevel,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/rejections.log') })
  ],
  exitOnError: false, // 当未捕获的异常出现时，避免退出进程
});

// 捕获异步上下文（如 Request ID）
const asyncLocalStorage = new async_hooks.AsyncLocalStorage();
const logWithContext = (level, message, context = {}) => {
  const store = asyncLocalStorage.getStore();
  const requestId = store ? store.requestId : 'N/A';
  logger.log({
    level: level,
    message: `[Request ID: ${requestId}] ${message}`,
    context: JSON.stringify(context)
  });
};

// Express 中间件，记录每个请求的 Request ID
app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4(); // 生成或获取 request ID
  asyncLocalStorage.run({ requestId }, () => next());
});

// 使用 Morgan 记录 HTTP 请求日志
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: { write: (message) => logger.http(message.trim()) }
}));

// 捕获未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  Sentry.captureException(reason);
  logger.error('Unhandled Rejection:', { reason, promise });
  if (isProduction) {
    process.exit(1); // 生产环境可以选择退出应用
  } else {
    logger.debug('In development mode, not exiting process.');
  }
});

// 捕获未处理的异常
process.on('uncaughtException', (error) => {
  Sentry.captureException(error);
  logger.error('Uncaught Exception:', error);
  if (isProduction) {
    process.exit(1); // 生产环境下可能希望退出应用
  } else {
    logger.debug('In development mode, not exiting process.');
  }
});

// 导出 logger 模块
module.exports = logger;