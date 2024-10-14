// services/userService.js

const User = require('../models/userModel');  // 用户模型
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 注册用户
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // 检查用户是否已经存在
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // 密码加密
  const hashedPassword = await bcrypt.hash(password, 10);

  // 创建新用户
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

// 用户登录
const loginUser = async (userData) => {
  const { email, password } = userData;

  // 查找用户
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email');
  }

  // 验证密码
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // 生成 JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

module.exports = {
  registerUser,
  loginUser,
};
