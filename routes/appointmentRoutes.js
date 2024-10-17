// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const logger = require('../utils/logger');

// 路由：根据服务名称查询服务详情
router.get('/service-info/:serviceKey', async (req, res) => {
  try {
    await appointmentController.getServiceInfo(req, res);
  } catch (error) {
    logger.error(`Error fetching service info for serviceKey ${req.params.serviceKey}:`, error.message);
    res.status(500).send('Error fetching service info');
  }
});

module.exports = router;