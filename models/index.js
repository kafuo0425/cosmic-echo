// models/index.js

const mongoose = require("mongoose");

mongoose.connection.on('disconnected', () => {
  console.error('MongoDB 连接已断开');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB 已重新连接');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 连接错误:', err);
});

module.exports = mongoose.connection;