require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const csrf = require("csrf");
const rateLimit = require("express-rate-limit");
const Sentry = require("@sentry/node");
const loggerMiddleware = require("./utils/logger");
const errorHandler = require("./utils/errorHandler");
const apiRoutes = require("./routes/api");

// 检查必要的环境变量
const requiredEnvVars = ["MONGODB_URI", "SENTRY_DSN", "NODE_ENV", "CORS_ORIGIN", "SESSION_SECRET", "PORT"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Error: Missing required environment variable ${varName}`);
    process.exit(1);  // 如果缺少必要变量，终止应用
  }
});

// 全局错误处理
process.on('uncaughtException', (err) => {
  Sentry.captureException(err);
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  Sentry.captureException(reason);
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Sentry 初始化
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.RELEASE_VERSION || '1.0.0',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 生产环境设置较低的采样率
});

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(helmet());
app.use(compression());

// 请求速率限制
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10分钟
  max: 100, // 每个IP最大请求数
  message: "Too many requests, please try again later.",
  headers: true,
});
app.use('/api/', limiter);

// 日志和CORS设置
app.use(loggerMiddleware);

// 允许的CORS源
const allowedOrigins = process.env.CORS_ORIGIN.split(',');
app.use(cors({ origin: allowedOrigins, credentials: true }));

// 解析请求体
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session管理
app.use(
  session({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 1天
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  })
);

// CSRF保护
const csrfProtection = csrf();
app.use(csrfProtection);

// 语言设置
const { parseAcceptLanguage } = require("./services/languageService");

app.use((req, res, next) => {
  const lang = parseAcceptLanguage(req.headers["accept-language"]) || "zh";
  req.language = lang;
  next();
});

// 提供CSRF Token
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  next();
});

// 连接 MongoDB
const connectWithRetry = async (retries = 5) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    loggerMiddleware.logger.info("MongoDB connected successfully");
  } catch (err) {
    loggerMiddleware.logger.error(`MongoDB connection error:`, err);
    if (retries > 0) {
      setTimeout(() => connectWithRetry(retries - 1), 5000);
    } else {
      Sentry.captureException(err);
      process.exit(1);
    }
  }
};
connectWithRetry();

// API 路由
app.use("/api", apiRoutes);

// 错误处理
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

// CSRF错误处理
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ message: 'Invalid CSRF token' });
  } else {
    next(err);
  }
});

// 启动服务器
const port = process.env.PORT || 9587;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;