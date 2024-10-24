import mongoose from 'mongoose';
const logger = require("../utils/logger").logger;

// 连接事件的处理
mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB connection disconnected");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB connection error:", err);
});

// 确保 MONGODB_URI 的安全性
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri || typeof mongoUri !== 'string' || !mongoUri.startsWith('mongodb://')) {
  logger.error("Invalid MONGODB_URI environment variable");
  process.exit(1); // 终止进程或采取其他处理措施
}

// 连接 MongoDB 的重试逻辑
const connectWithRetry = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info("MongoDB connected successfully");
      return; // 连接成功后退出循环
    } catch (err) {
      if (i < retries - 1) {
        logger.error(`MongoDB connection failed, retrying... (${retries - i - 1} retries left)`, err);
        await new Promise(res => setTimeout(res, 5000)); // 等待后重试
      } else {
        logger.error("Failed to connect to MongoDB after several attempts");
        process.exit(1); // 终止进程或采取其他处理措施
      }
    }
  }
};

// 调用连接函数
connectWithRetry();

// 导入模型
const models = {
  User: require("./userModel"),
  UserPreferences: require("./userPreferencesModel"),
};

// 检查模型是否导入成功
for (const modelName in models) {
  if (!models[modelName]) {
    logger.error(`Model ${modelName} failed to load.`);
  }
}

export default models;