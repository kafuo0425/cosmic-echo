/* eslint-disable no-console */
// utils/helper.js

const crypto = require("crypto");

// 格式化日期：允许传入自定义的格式和本地化设置
const formatDate = (date = new Date(), locale = "en-US", options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // 使用默认选项和传入选项的组合来格式化日期
  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(date);
};

// 生成随机字符串：允许自定义字符集（默认为hex）
const generateRandomString = (length = 16, charset = "hex") => {
  // 验证长度有效性
  if (length <= 0) {
    throw new Error("Length must be a positive number");
  }
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));

  // 如果使用默认的hex字符集，直接返回
  if (charset === "hex") {
    return randomBytes.toString("hex").slice(0, length);
  }
  const charsets = {
    alphanumeric:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    numeric: "0123456789",
    alphabetic: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  };

  // TODO: 检查此处的对象注入漏洞
  // 验证字符集是否有效，默认为alphanumeric
  const selectedCharset = charsets[charset] || charsets.alphanumeric;

  return Array.from(randomBytes)
    .map((byte) => selectedCharset[byte % selectedCharset.length])
    .slice(0, length)
    .join("");
};

// 生成加密哈希：支持不同的算法和字符集
const generateHash = (input, algorithm = "sha256", encoding = "hex") => {
  return crypto.createHash(algorithm).update(input).digest(encoding);
};

module.exports = { formatDate, generateRandomString, generateHash };
