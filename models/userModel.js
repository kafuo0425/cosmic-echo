import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const logger = require("../utils/logger").logger;

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
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
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    status: {
      type: String,
      enum: ["new", "booked", "interested"],
      default: "new",
    },
    history: [
      {
        message: String,
        reply: String,
        emotion: String,
        timestamp: Date,
      },
    ],
  },
  { timestamps: true },
);

// 密码加密方法
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    logger.error("Error hashing password:", err);
    next(err);
  }
});

// 密码比对方法
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    logger.error("Error comparing password:", err);
    throw err;
  }
};

// 添加用户索引
userSchema.index({ email: 1, userId: 1 });

export default mongoose.model("User", userSchema);