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

const app = express();

// 初始化 csrf tokens
const tokens = new csrf();

// 安全性中间件
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(cookieParser());

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

// CSRF 中间件
app.use((req, res, next) => {
  // 排除不需要 CSRF 保护的路由（如 Webhook）
  const excludedRoutes = ['/api/facebook', '/api/personalization', '/api/whatsapp'];
  if (excludedRoutes.some(route => req.path.startsWith(route))) {
    return next();
  }

  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    const secret = tokens.secretSync();
    res.cookie('csrfSecret', secret, { httpOnly: true });
    res.locals.csrfToken = tokens.create(secret);
    return next();
  }

  const secret = req.cookies.csrfSecret;
  const token = req.body._csrf || req.headers['x-csrf-token'];

  if (secret && token && tokens.verify(secret, token)) {
    return next();
  }

  return res.status(403).send('Invalid CSRF token');
});

// 速率限制，防止暴力攻击
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// MongoDB 连接
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => logger.info('MongoDB connected'))
  .catch(err => {
    logger.error('MongoDB connection failed:', err);
    process.exit(1);
  });

// 使用 API 路由
app.use('/api', apiRoutes);

// 捕获未处理的 Promise 拒绝和未捕获的异常
errorHandler.catchUnhandledRejection();
errorHandler.catchUncaughtException();

// 全局错误处理
app.use(errorHandler.handleError);

// 启动服务器
const PORT = process.env.PORT || 9587;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;