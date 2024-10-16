// controllers/courseController.js
 
const express = require("express");
const router = express.Router();
const courseService = require('../services/courseService');
const logger = require("../utils/logger");

router.get('/:courseId', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const courseDetails = await courseService.getCourseDetails(courseId);

        if (courseDetails) {
            res.status(200).send(courseDetails);
        } else {
            res.status(404).send({ error: "Course not found" });
        }
    } catch (error) {
        logger.error('Error retrieving course details:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;