// models/userModel.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltRounds = process.env.SALT_ROUNDS || 10;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,  // 确保查询时不返回密码
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// 密码加密方法
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);  // 使用 bcrypt 加密
  next();
});

// 密码比对方法
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 确保索引
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);