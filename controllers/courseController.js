// controllers/courseController.js
 
const express = require("express");
const router = express.Router();
const courseService = require('../services/courseService');
const logger = require("../utils/logger");

router.get('/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const courseDetails = courseService.getCourseDetails(courseId);

    if (courseDetails) {
      res.status(200).send(courseDetails);
    } else {
      res.status(404).send({ error: "未找到该课程" });
    }
  } catch (error) {
    logger.error('获取课程详情时出错:', error);
    res.status(500).send({ error: '内部服务器错误' });
  }
});

module.exports = router;
