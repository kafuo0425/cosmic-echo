// app.js

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const csrf = require('csrf');
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger');
const errorHandler = require('./utils/errorHandler');
const apiRoutes = require('./routes/api');
const csrfProtection = new csrf();

const app = express();

// 安全性中间件
app.use(helmet()); // 提供基本的安全保护（包括HTTP头的保护）
app.use(compression()); // 启用Gzip压缩，提升性能
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' })); // 跨域设置，可通过环境变量控制允许的域
app.use(cookieParser()); // 解析Cookie

// 请求体解析
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// 动态语言设置（从请求头解析）
const { setLanguage, parseAcceptLanguage } = require('./services/languageService');
app.use((req, res, next) => {
  const lang = parseAcceptLanguage(req.headers['accept-language']) || 'zh';
  setLanguage(lang);
  next();
});

// CSRF 中间件（保护API不受跨站点请求伪造攻击）
app.use((req, res, next) => {
  const excludedRoutes = ['/api/facebook', '/api/personalization', '/api/whatsapp'];

  if (excludedRoutes.some(route => req.path.startsWith(route))) {
    return next();
  }

  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    const secret = csrfProtection.secretSync();
    res.cookie('csrfSecret', secret, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.locals.csrfToken = csrfProtection.create(secret);
    return next();
  }

  const secret = req.cookies.csrfSecret;
  const token = req.body._csrf || req.headers['x-csrf-token'];

  if (secret && token && csrfProtection.verify(secret, token)) {
    return next();
  }

  return res.status(403).json({ message: 'Invalid CSRF token' });
});

// 速率限制器（防止暴力攻击和滥用请求）
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10分钟
  max: 100, // 每IP最多100个请求
  message: 'Too many requests, please try again later.',
  headers: true,
});
app.use(limiter);

// MongoDB 连接
mongoose.connect(process.env.MONGODB_URI)
  .then(() => logger.info('MongoDB connected successfully'))
  .catch(err => {
    logger.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// 使用 API 路由
app.use('/api', apiRoutes);

// 捕获未处理的 Promise 拒绝和未捕获的异常
errorHandler.catchUnhandledRejection();
errorHandler.catchUncaughtException();

// 全局错误处理（所有未捕获的错误会在这里处理）
app.use(errorHandler.handleError);

// 启动服务器
const PORT = process.env.PORT || 9587;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;