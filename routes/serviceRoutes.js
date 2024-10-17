// routes/serviceRoutes.js

const express = require('express');
const { param } = require('express-validator');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const logger = require('../utils/logger');

// 动态路由：根据服务类别获取服务信息
router.get(
  '/service-info/:categoryKey', 
  [
    // 验证 categoryKey 是否为非空字符串
    param('categoryKey')
      .isString()
      .notEmpty()
      .withMessage('categoryKey is required and must be a valid string')
  ],
  async (req, res) => {
    try {
      // 日志记录请求的服务类别
      logger.info(`Fetching service info for category: ${req.params.categoryKey}`);
      
      await serviceController.getServiceInfo(req, res);
    } catch (error) {
      // 捕获并记录错误
      logger.error(`Error fetching service info for category ${req.params.categoryKey}:`, error.message);
      res.status(500).send({ error: 'Error fetching service info' });
    }
  }
);

module.exports = router;