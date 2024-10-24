import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import Sentry from '@sentry/node';
import cors from 'cors';
import session from 'express-session';
import { logger, expressLogger } from './utils/logger.js';
import errorHandler from './utils/errorHandler.js';
import config from './config/default.json' assert { type: 'json' };
import userRoutes from './routes/userRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import Joi from 'joi';

// 全局异常捕获
process.on('uncaughtException', handleCriticalError);
process.on('unhandledRejection', handleCriticalError);

function handleCriticalError(err) {
  logger.error('Critical error:', err.stack || err);
  if (process.env.SENTRY_DSN) Sentry.captureException(err);
  gracefulShutdown(1);
}

function gracefulShutdown(code) {
  Promise.all([
    mongoose.connection.close(), // 关闭MongoDB连接
    // 如果有 Redis 或其他连接可以关闭，按需添加
    // redisClient.quit(),  // 示例：关闭 Redis 连接
  ])
    .then(() => {
      logger.info('Resources closed. Exiting now...');
      process.exit(code);
    })
    .catch((err) => {
      logger.error('Error during graceful shutdown:', err);
      process.exit(code);
    });
}

// 环境变量校验函数
function validateEnvVars(requiredVars) {
  const missingEnvVars = requiredVars.filter((varName) => !process.env[varName]);
  if (missingEnvVars.length) {
    missingEnvVars.forEach((varName) => logger.error(`Missing required environment variable: ${varName}`));
    process.exit(1);
  }
}

validateEnvVars(['MONGODB_URI', 'NODE_ENV', 'CORS_ORIGIN', 'SESSION_SECRET', 'EMAIL_USER', 'EMAIL_PASS']);

// 环境变量解构
const { MONGODB_URI, SENTRY_DSN, NODE_ENV, CORS_ORIGIN, SESSION_SECRET } = process.env;

const app = express();

// Sentry 初始化 (仅在非开发环境)
if (SENTRY_DSN && NODE_ENV !== 'development') {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
    tracesSampleRate: NODE_ENV === 'production' ? 0.2 : 1.0
  });

  // Sentry 请求处理器必须在所有中间件之前调用
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

// 中间件设置
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'same-site' },
    hsts: NODE_ENV === 'production' ? { maxAge: 31536000, includeSubDomains: true } : false
  })
);
app.use(compression());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: NODE_ENV === 'production', sameSite: 'strict' }
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100 // 每个IP最多100个请求
  })
);
app.use(expressLogger); // 使用 expressLogger 来记录每个请求

// 路由设置
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// Sentry 错误处理器
if (SENTRY_DSN && NODE_ENV !== 'development') {
  app.use(Sentry.Handlers.errorHandler());
}

// 自定义错误处理中间件
app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') {
    logger.error(err.stack);
    return res.status(500).send('Internal Server Error');
  }
  next(err); // 继续传递错误到 Sentry 等上层处理器
});

// Joi 验证示例
const validateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};

// 连接 MongoDB 并启动服务器
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

export default app;