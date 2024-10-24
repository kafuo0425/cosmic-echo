import express from 'express';
const router = express.Router();
import facebookController from '../controllers/facebookController';
import { verifyWebhook } from '../middlewares/verifyWebhook';
import logger from '../utils/logger';

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

export default router;