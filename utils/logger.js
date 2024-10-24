import winston from 'winston';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import async_hooks from 'async_hooks';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';

const asyncLocalStorage = new async_hooks.AsyncLocalStorage();

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
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new DailyRotateFile({
      filename: path.join(logsDir, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, "exceptions-%DATE%.log"),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, "rejections-%DATE%.log"),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
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

export const logger = logger;
export const expressLogger = expressLogger;