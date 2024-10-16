// models/index.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB 已成功连接");
    
    // 捕捉其他连接事件
    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB 连接已断开');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB 已重新连接');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB 连接错误:', err);
    });

  } catch (error) {
    console.error("MongoDB 连接失败:", error);
    process.exit(1);
  }
};

module.exports = connectDB;