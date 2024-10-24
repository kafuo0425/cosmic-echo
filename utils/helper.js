import crypto from 'crypto';

// 格式化日期：允许传入自定义的格式和本地化设置
const formatDate = (date = new Date(), locale = 'en-US', options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(date);
};

// 生成随机字符串：允许自定义字符集（默认为hex）
const generateRandomString = (length = 16, charset = 'hex') => {
  if (length <= 0) {
    throw new Error('Length must be a positive number');
  }

  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));

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

// 生成加密哈希：支持不同的算法和字符集
const generateHash = (input, algorithm = 'sha256', encoding = 'hex') => {
  if (typeof input !== 'string' || input.length === 0) {
    throw new Error('Input must be a non-empty string');
  }
  return crypto.createHash(algorithm).update(input).digest(encoding);
};

export const formatDate = formatDate;
export const generateRandomString = generateRandomString;
export const generateHash = generateHash;