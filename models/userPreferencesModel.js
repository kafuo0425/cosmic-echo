const mongoose = require("mongoose");
// const logger = require("../utils/logger").logger; // 移除未使用的 logger

const userPreferencesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    preferences: {
      language: { type: String, default: "zh" },
      theme: { type: String, default: "light" },
      notification: { type: Boolean, default: true },
    },
    emotionHistory: [
      {
        emotion: { type: String, required: true },
        intensity: { type: Number, default: 1 },
        source: { type: String, default: "chatbot" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    lastInteraction: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// 自动更新 lastInteraction 的方法
userPreferencesSchema.methods.updateLastInteraction = function () {
  this.lastInteraction = Date.now();
  return this.save();
};

// 用户偏好关联更新方法
userPreferencesSchema.methods.updatePreferences = function (newPreferences) {
  this.preferences = { ...this.preferences, ...newPreferences };
  return this.save();
};

// 确保 userId 索引存在
userPreferencesSchema.index({ userId: 1 });

module.exports = mongoose.model("UserPreferences", userPreferencesSchema);