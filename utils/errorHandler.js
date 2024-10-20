/* eslint-disable no-console */
// utils/errorHandler.js

const { logger } = require("./logger");
const Sentry = require("@sentry/node");

// 自定义错误处理程序
exports.handleError = (err, req, res, _next) => {
  // 错误信息日志记录，包含请求方法、URL和堆栈信息
  logger.error(
    `Error handling request: ${req.method} ${req.url} - ${err.message}`,
    {
      stack: err.stack,
      statusCode: err.status || 500,
    },
  );

  // 如果处于生产环境，向 Sentry 报告错误
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(err);
  }

  // 返回状态码及错误信息，生产环境下隐藏详细错误信息
  const statusCode = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message;
  res.status(statusCode).json({ error: message });
};

// 捕获未处理的 Promise 拒绝
exports.catchUnhandledRejection = () => {
  process.on("unhandledRejection", (reason, _promise) => {
    // 日志记录未处理的 Promise 拒绝
    logger.error("Unhandled Promise Rejection:", { reason });

    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(reason);

      // 延迟进程退出以确保日志和 Sentry 上报完成
      setTimeout(() => process.exit(1), 100);
    }
  });
};

// 捕获未处理的异常
exports.catchUncaughtException = () => {
  process.on("uncaughtException", (error) => {
    // 日志记录未捕获的异常
    logger.error("Uncaught Exception:", { error });

    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(error);
      setTimeout(() => process.exit(1), 100);
    }
  });
};
