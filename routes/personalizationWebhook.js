// routes/personalizationWebhook.js

const express = require("express");
const router = express.Router();
const personalizationController = require("../controllers/personalizationController");

// 使用个性化控制器处理 Webhook 请求
router.use('/', personalizationController.getPersonalizedMessage);

module.exports = router;