import { logger } from './logger';
import Sentry from '@sentry/node';

export const handleError = (err, req, res) => {
  const statusCode = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message;

  logger.error(`Error handling request: ${req.method} ${req.url} - ${message}`, {
    stack: err.stack,
    statusCode: statusCode,
  });

  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(err);
  }

  res.status(statusCode).json({ error: message });
};

// 捕获未处理的Promise拒绝
export const catchUnhandledRejection = () => {
  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Promise Rejection:", { reason });

    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(reason);
    }
    if (reason instanceof Error && reason.isCritical) {
      setTimeout(() => process.exit(1), 100);
    }
  });
};

// 捕获未捕获的异常
export const catchUncaughtException = () => {
  process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception:", { error });

    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(error);
    }
    if (error.isCritical) {
      setTimeout(() => process.exit(1), 100);
    }
  });
};