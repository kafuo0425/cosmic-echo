// models/userPreferencesModel.js

const mongoose = require("mongoose");

const userPreferencesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,  // 添加索引
    },
    preferences: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }  // 自动添加 created_at 和 updated_at
);

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);