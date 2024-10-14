// routes/facebookWebhook.js

const express = require("express");
const router = express.Router();
const facebookController = require("../controllers/facebookController");
const { verifyWebhook } = require("../middlewares/verifyWebhook");

// Facebook Webhook 验证
router.get('/webhook', verifyWebhook(process.env.FACEBOOK_VERIFY_TOKEN));

// Facebook 消息处理
router.post('/webhook', facebookController.handleMessage);

module.exports = router;