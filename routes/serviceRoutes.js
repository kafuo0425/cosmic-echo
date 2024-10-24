import express from 'express';
import { param } from 'express-validator';
const router = express.Router();
import serviceController from '../controllers/serviceController';
import logger from '../utils/logger';

// 动态路由：根据服务类别获取服务信息
router.get(
  "/service-info/:categoryKey",
  [
    param("categoryKey")
      .isString()
      .notEmpty()
      .withMessage("categoryKey is required and must be a valid string"),
  ],
  async (req, res) => {
    try {
      // 日志记录请求的服务类别
      logger.info(
        `Fetching service info for category: ${req.params.categoryKey}`,
      );

      await serviceController.getServiceInfo(req, res);
    } catch (error) {
      // 捕获并记录错误
      logger.error(
        `Error fetching service info for category ${req.params.categoryKey}: ${error.message}`,
      );
      res.status(500).send({ error: "Error fetching service info" });
    }
  },
);

export default router;