// utils/errorHandler.js

const logger = require('./logger');
const Sentry = require('@sentry/node'); // 集成 Sentry 进行错误监控

// 自定义错误处理程序
exports.handleError = (err, req, res, next) => {
  // 记录错误详细信息
  logger.error(`Error handling request: ${req.method} ${req.url} - ${err.message}`);

  // 将错误报告到 Sentry（如果有需要）
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(err);
  }

  // 设置响应状态码
  const statusCode = err.status || 500;

  // 如果是生产环境，只返回简短的错误信息
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : err.message;

  // 发送错误响应
  res.status(statusCode).send({ error: message });
};

// 捕获未处理的 Promise 拒绝
exports.catchUnhandledRejection = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Promise Rejection:', reason);

    // 生产环境下将未处理的 Promise 拒绝报告到 Sentry
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(reason);
      // 退出进程，确保应用程序在生产环境中稳定
      setTimeout(() => process.exit(1), 100); 
    }
  });
};

// 捕获未处理的异常
exports.catchUncaughtException = () => {
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);

    // 将异常报告到 Sentry
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    }

    // 确保进程在出现未捕获异常时退出，防止不稳定状态
    // 延迟退出，确保日志和监控系统完全处理错误
    setTimeout(() => process.exit(1), 100);
  });
};