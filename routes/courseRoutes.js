// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// 课程相关的 API 路由
router.post('/', courseController.createCourse); // 创建课程
router.get('/', courseController.getAllCourses); // 获取所有课程
router.get('/:id', courseController.getCourseById); // 获取单个课程
router.put('/:id', courseController.updateCourse); // 更新课程
router.delete('/:id', courseController.deleteCourse); // 删除课程

module.exports = router;
