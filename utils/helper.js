// utils/helper.js

// 格式化日期：返回符合指定格式的日期字符串
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

// 生成随机字符串：使用 crypto 模块生成指定长度的随机字符串
const generateRandomString = (length = 16) => {
  return require('crypto').randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

module.exports = {
  formatDate,
  generateRandomString,
};