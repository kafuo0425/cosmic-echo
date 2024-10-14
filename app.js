// app.js

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require('./utils/logger');
const compression = require("compression");
const helmet = require("helmet");
const chatbotRoutes = require("./controllers/chatbotController");
const courseRoutes = require("./controllers/courseController");
const { initI18n, setLanguage } = require('./services/languageService');

const app = express();

// 初始化语言支持
initI18n();

// 中间件设置
app.use(compression());
app.use(helmet());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

// 在每个请求中动态设置语言
app.use((req, res, next) => {
  const lang = req.headers['accept-language'] || 'zh'; // 默认中文
  setLanguage(lang);
  next();
});

// MongoDB 连接设置
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB 连接成功'))
  .catch((err) => logger.error('MongoDB 连接失败:', err));

// 路由
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/courses', courseRoutes);

// 错误处理
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).send({ error: err.message });
});

// 启动服务器
const PORT = process.env.PORT || 9587;
app.listen(PORT, () => {
  logger.info(`服务器运行中，端口：${PORT}`);
});

module.exports = app;