// models/userPreferencesModel.js

const mongoose = require("mongoose");

const userPreferencesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    preferences: {
      language: { type: String, default: 'zh' },  // 默认语言为中文
      theme: { type: String, default: 'light' },  // 界面主题
      notification: { type: Boolean, default: true },  // 是否启用通知
      // 可扩展的其他用户偏好
    },
    emotionHistory: [
      {
        emotion: { type: String, required: true },  // 用户情感，如"开心"、"紧张"等
        intensity: { type: Number, default: 1 },   // 情感强度，1-5 分级
        source: { type: String, default: 'chatbot' },  // 情感来源，如"chatbot"或"manual"
        timestamp: { type: Date, default: Date.now },
      }
    ],
    lastInteraction: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

// 自动更新 lastInteraction 的方法
userPreferencesSchema.methods.updateLastInteraction = function () {
  this.lastInteraction = Date.now();
  return this.save();
};

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);