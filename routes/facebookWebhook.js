/* eslint-disable no-console */
// routes/facebookWebhook.js

const express = require("express");
const router = express.Router();
const facebookController = require("../controllers/facebookController");
const { verifyWebhook } = require("../middlewares/verifyWebhook");
const logger = require("../utils/logger");

// Facebook Webhook 验证
router.get(
  "/webhook",
  verifyWebhook(process.env.FACEBOOK_VERIFY_TOKEN),
  (req, res) => {
    res.send("Facebook Webhook verified");
  },
);

// Facebook 消息处理
router.post("/webhook", async (req, res) => {
  try {
    await facebookController.handleMessage(req, res);
  } catch (error) {
    logger.error(`Error handling Facebook message: ${error.message}`);
    res.status(500).send("Error handling Facebook message");
  }
});

module.exports = router;
