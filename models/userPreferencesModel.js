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
      type: Object,
      default: {},
    },
    // 添加情感历史，用于个性化消息和情感化回复
    emotionHistory: [
      {
        emotion: String,
        timestamp: { type: Date, default: Date.now },
      }
    ],
    lastInteraction: {  // 记录上次交互时间
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);
