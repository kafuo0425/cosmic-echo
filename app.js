require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require('./utils/logger');
const timeout = require("connect-timeout");
const userRoutes = require("./controllers/userController");
const chatbotRoutes = require("./controllers/chatbotController");
const facebookWebhookRoutes = require("./routes/facebookWebhook");
const personalizationWebhookRoutes = require("./routes/personalizationWebhook");
const whatsappWebhookRoutes = require("./routes/whatsappWebhook");
const { initI18n, setLanguage } = require('./services/languageService'); // 引入语言服务

const app = express();

// 初始化语言支持
initI18n();

app.use(bodyParser.json());
app.use(cors());
app.use(timeout('30s'));

// 在每个请求中动态设置语言
app.use((req, res, next) => {
  const lang = req.headers['accept-language'] || 'en'; // 从请求头获取语言，默认使用英语
  setLanguage(lang);
  next();
});

// 日志记录中间件
app.use((req, res, next) => { 
  logger.info(`${req.method} ${req.url}`);
  next();
});

// MongoDB 连接设置
const dbURI = process.env.MONGODB_URI;
const connectWithRetry = () => {
  mongoose.connect(dbURI)  // 移除废弃选项
    .then(() => logger.info('MongoDB 已连接'))
    .catch((err) => {
      logger.error('MongoDB 连接错误:', err);
      setTimeout(connectWithRetry, 5000); // 每5秒重试连接
    });
};

connectWithRetry();

// 路由设置
app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/webhook/facebook', facebookWebhookRoutes);
app.use('/webhook/personalization', personalizationWebhookRoutes);
app.use('/webhook/whatsapp', whatsappWebhookRoutes);

// 错误处理
app.use((err, req, res, next) => { 
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  const statusCode = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? '服务器内部错误' : err.message;
  res.status(statusCode).send({ error: message });
});

// 启动服务器
const PORT = process.env.PORT || 9587;
app.listen(PORT, () => {
  logger.info(`主服务器已启动，端口：${PORT}`);
});

module.exports = app;
