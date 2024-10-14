// models/index.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB 已成功连接");
  } catch (error) {
    console.error("MongoDB 连接失败:", error);
    process.exit(1);
  }
};

module.exports = connectDB;