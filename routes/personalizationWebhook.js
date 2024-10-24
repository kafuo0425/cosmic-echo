import express from 'express';
const router = express.Router();
import personalizationController from '../controllers/personalizationController';
import logger from '../utils/logger';

// 处理个性化 Webhook 请求
router.post("/", async (req, res) => {
  try {
    await personalizationController.getPersonalizedMessage(req, res);
  } catch (error) {
    logger.error(`Error handling personalization request: ${error.message}`);
    res.status(500).send("Error handling personalization request");
  }
});

export default router;