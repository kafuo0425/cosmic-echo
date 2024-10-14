// services/courseService.js

const mongoose = require('mongoose');

// 课程 Schema 定义
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true }, // 课程标题
    description: { type: String, required: true }, // 课程描述
    duration: { type: Number, default: 60 }, // 课程时长，默认60分钟
    language: { type: String, default: 'zh' }, // 课程语言，默认中文
    attendees: { type: Number, default: 0 }, // 参与人数
    maxAttendees: { type: Number, default: 20 }, // 最大参与人数
    date: { type: Date, required: true }, // 课程日期
    location: { type: String, default: 'online' }, // 课程地点，默认线上
    instructor: { type: String, required: true }, // 授课老师
    createdAt: { type: Date, default: Date.now }, // 创建时间
    updatedAt: { type: Date, default: Date.now } // 更新时间
});

// 创建 Course 模型
const Course = mongoose.model('Course', courseSchema);

// 创建课程
exports.createCourse = async (courseData) => {
    const course = new Course(courseData);
    return await course.save();
};

// 获取所有课程
exports.getAllCourses = async () => {
    return await Course.find();
};

// 获取指定课程
exports.getCourseById = async (id) => {
    return await Course.findById(id);
};

// 更新课程
exports.updateCourse = async (id, updateData) => {
    return await Course.findByIdAndUpdate(id, updateData, { new: true });
};

// 删除课程
exports.deleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
};
