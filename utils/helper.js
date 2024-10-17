// utils/helper.js

const crypto = require('crypto');

// 格式化日期：允许传入自定义的格式和本地化设置
const formatDate = (date, locale = 'en-US', options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
};

// 生成随机字符串：允许自定义字符集（默认为hex）
const generateRandomString = (length = 16, charset = 'hex') => {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  
  if (charset === 'hex') {
    return randomBytes.toString('hex').slice(0, length);
  }
  
  const charsets = {
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    numeric: '0123456789',
    alphabetic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  };

  const selectedCharset = charsets[charset] || charsets.alphanumeric;
  return Array.from(randomBytes)
    .map(byte => selectedCharset[byte % selectedCharset.length])
    .slice(0, length)
    .join('');
};

module.exports = {
  formatDate,
  generateRandomString,
};