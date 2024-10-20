const { logger } = require("./logger");
const Sentry = require("@sentry/node");

// 自定义错误处理程序
exports.handleError = (err, req, res) => {
  logger.error(
    `Error handling request: ${req.method} ${req.url} - ${err.message}`,
    {
      stack: err.stack,
      statusCode: err.status || 500,
    }
  );

  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(err);
  }

  const statusCode = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message;
  
  res.status(statusCode).json({ error: message });
};

// 捕获未处理的 Promise 拒绝
exports.catchUnhandledRejection = () => {
  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Promise Rejection:", { reason });

    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(reason);
      setTimeout(() => process.exit(1), 100);
    }
  });
};

// 捕获未处理的异常
exports.catchUncaughtException = () => {
  process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception:", { error });

    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(error);
      setTimeout(() => process.exit(1), 100);
    }
  });
};