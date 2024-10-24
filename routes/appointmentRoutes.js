import express from 'express';
const router = express.Router();
import appointmentController from '../controllers/appointmentController';
import logger from '../utils/logger';

// 路由：根据服务名称查询服务详情
router.get("/service-info/:serviceKey", async (req, res) => {
  try {
    await appointmentController.getServiceInfo(req, res);
  } catch (error) {
    logger.error(
      `Error fetching service info for serviceKey ${req.params.serviceKey}: ${error.message}`,
    );
    res.status(500).send("Error fetching service info");
  }
});

export default router;