import express from 'express';
const router = express.Router();
import courseController from '../controllers/courseController';
import logger from '../utils/logger';

// 创建课程
router.post("/", async (req, res) => {
  try {
    await courseController.createCourse(req, res);
  } catch (error) {
    logger.error(`Error creating course: ${error.message}`);
    res.status(500).send("Error creating course");
  }
});

// 获取所有课程
router.get("/", async (req, res) => {
  try {
    await courseController.getAllCourses(req, res);
  } catch (error) {
    logger.error(`Error fetching courses: ${error.message}`);
    res.status(500).send("Error fetching courses");
  }
});

// 获取单个课程
router.get("/:id", async (req, res) => {
  try {
    await courseController.getCourseById(req, res);
  } catch (error) {
    logger.error(`Error fetching course with ID ${req.params.id}: ${error.message}`);
    res.status(500).send("Error fetching course");
  }
});

// 更新课程
router.put("/:id", async (req, res) => {
  try {
    await courseController.updateCourse(req, res);
  } catch (error) {
    logger.error(`Error updating course with ID ${req.params.id}: ${error.message}`);
    res.status(500).send("Error updating course");
  }
});

// 删除课程
router.delete("/:id", async (req, res) => {
  try {
    await courseController.deleteCourse(req, res);
  } catch (error) {
    logger.error(`Error deleting course with ID ${req.params.id}: ${error.message}`);
    res.status(500).send("Error deleting course");
  }
});

export default router;