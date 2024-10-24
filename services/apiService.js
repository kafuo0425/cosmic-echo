const axios = require('axios');
const axiosRetry = require('axios-retry');

// 配置 axios 的重试机制，失败时最多重试 3 次
axiosRetry(axios, { retries: 3 });

// 通用的 GET 请求函数
const fetchData = async (url, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (err) {
    console.error(`API request failed: ${err.message}`);
    throw new Error('API error');
  }
};

// 通用的 POST 请求函数
const postData = async (url, data, config = {}) => {
  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (err) {
    console.error(`API request failed: ${err.message}`);
    throw new Error('API error');
  }
};

module.exports = {
  fetchData,
  postData
};
