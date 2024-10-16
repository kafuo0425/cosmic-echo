// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// 路由：根据服务名称查询服务详情
router.get('/service-info/:serviceKey', appointmentController.getServiceInfo);

module.exports = router;
